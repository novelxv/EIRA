from typing import Dict, List, Any, TYPE_CHECKING, Optional
from loguru import logger
import torch
import torch.nn as nn
import os
import json
from datetime import datetime
import re

from transformers import AutoTokenizer
from transformers import AutoModelForQuestionAnswering, AutoConfig, AutoModel, PreTrainedModel
from transformers import pipeline

from huggingfastapi.models.payload import AIDetectionPayload, TextGenerationPayload
from huggingfastapi.models.prediction import AIDetectionResult, EvaluationResult
from huggingfastapi.services.utils import ModelLoader
from huggingfastapi.core.messages import NO_VALID_PAYLOAD
from huggingfastapi.core.config import (
    DEFAULT_MODEL_PATH,
    AI_DETECTION_MODEL,
)

# Additional imports for evaluators
import google.generativeai as genai

# Get GEMINI_API_KEY from environment
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

if TYPE_CHECKING:
    from huggingfastapi.services.text_generation import TextGenerationModel
#Text


class DesklibAIDetectionModel(PreTrainedModel):
    config_class = AutoConfig

    def __init__(self, config):
        super().__init__(config)
        # Initialize the base transformer model.
        self.model = AutoModel.from_config(config)
        # Define a classifier head.
        self.classifier = nn.Linear(config.hidden_size, 1)
        # Initialize weights (handled by PreTrainedModel)
        self.init_weights()

    def forward(self, input_ids, attention_mask=None, labels=None):
        # Forward pass through the transformer
        outputs = self.model(input_ids, attention_mask=attention_mask)
        last_hidden_state = outputs[0]
        # Mean pooling
        input_mask_expanded = attention_mask.unsqueeze(-1).expand(last_hidden_state.size()).float()
        sum_embeddings = torch.sum(last_hidden_state * input_mask_expanded, dim=1)
        sum_mask = torch.clamp(input_mask_expanded.sum(dim=1), min=1e-9)
        pooled_output = sum_embeddings / sum_mask

        # Classifier
        logits = self.classifier(pooled_output)
        loss = None
        if labels is not None:
            loss_fct = nn.BCEWithLogitsLoss()
            loss = loss_fct(logits.view(-1), labels.float())

        output = {"logits": logits}
        if loss is not None:
            output["loss"] = loss
        return output


class AIDetectionModel(object):
    def __init__(self, path=DEFAULT_MODEL_PATH):
        self.path = path
        self.model_name = AI_DETECTION_MODEL
        self.max_len = 768
        self.threshold = 0.5
        self._load_local_model()

    def _load_local_model(self):
        logger.info(f"Loading AI detection model: {self.model_name}")
        
        # Use ModelLoader to handle local storage and loading
        tokenizer, model = ModelLoader(
            model_name=self.model_name,
            model_directory=self.path,
            tokenizer_loader=AutoTokenizer,
            model_loader=DesklibAIDetectionModel,
        ).retrieve()
        
        self.tokenizer = tokenizer
        self.model = model
        
        # Device is already handled by ModelLoader
        self.device = next(model.parameters()).device
        
        logger.info(f"AI detection model loaded on device: {self.device}")

    def _pre_process(self, payload: AIDetectionPayload) -> str:
        logger.debug("Pre-processing AI detection payload.")
        return payload.text

    def _post_process(self, probability: float, label: int) -> AIDetectionResult:
        logger.debug("Post-processing AI detection prediction.")
        
        prediction_text = "AI Generated" if label == 1 else "Human Generated"
        
        ai_result = AIDetectionResult(
            probability=probability,
            label=label,
            prediction=prediction_text
        )
        
        return ai_result

    def _predict(self, text: str) -> tuple:
        logger.debug("Predicting AI detection.")
        
        encoded = self.tokenizer(
            text,
            padding='max_length',
            truncation=True,
            max_length=self.max_len,
            return_tensors='pt'
        )
        input_ids = encoded['input_ids'].to(self.device)
        attention_mask = encoded['attention_mask'].to(self.device)

        self.model.eval()
        with torch.no_grad():
            outputs = self.model(input_ids=input_ids, attention_mask=attention_mask)
            logits = outputs["logits"]
            probability = torch.sigmoid(logits).item()

        label = 1 if probability >= self.threshold else 0
        return probability, label

    def predict(self, payload: AIDetectionPayload):
        if payload is None:
            raise ValueError(NO_VALID_PAYLOAD.format(payload))

        pre_processed_text = self._pre_process(payload)
        probability, label = self._predict(pre_processed_text)
        logger.info(f"AI Detection - Probability: {probability:.4f}, Label: {label}")
        post_processed_result = self._post_process(probability, label)

        return post_processed_result
    

class GeminiPromptEvaluator:
    """Advanced prompt evaluator using Gemini 2.5 Pro with few-shot learning"""
    
    def __init__(self, api_key: Optional[str] = None):
        """Initialize the evaluator with Gemini API"""
        self.api_key = api_key or GEMINI_API_KEY
        self.model = None
        self.setup_gemini()
        
        # Research-backed evaluation criteria
        self.criteria_weights = {
            'clarity': 0.25,
            'specificity': 0.30,
            'ethics': 0.20,
            'effectiveness': 0.25
        }
        
        # Sources for citations
        self.sources = [
            "OpenAI Best Practices for Prompt Engineering",
            "Google AI Prompt Design Principles",
            "Anthropic Constitutional AI Research",
            "Microsoft Responsible AI Guidelines",
            "DAIR.AI Prompting Guide"
        ]

    def setup_gemini(self) -> bool:
        """Setup Gemini API connection"""
        if not self.api_key:
            logger.error("No Gemini API key found. Set GEMINI_API_KEY environment variable.")
            return False

        try:
            genai.configure(api_key=self.api_key)
            
            # Configure model with optimal settings for evaluation tasks
            generation_config = {
                "temperature": 0.1,  # Low temperature for consistent evaluation
                "top_p": 0.8,
                "top_k": 40,
                "max_output_tokens": 2048,
            }
            
            safety_settings = [
                {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
                {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
                {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
                {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
            ]
            
            self.model = genai.GenerativeModel(
                model_name="gemini-2.5-pro",
                generation_config=generation_config,
                safety_settings=safety_settings
            )
            
            logger.info("Gemini API connected successfully")
            return True
            
        except Exception as e:
            logger.error(f"Gemini API connection failed: {e}")
            return False

    def create_few_shot_examples(self) -> str:
        """Create few-shot examples for better evaluation consistency"""
        return """
Here are examples of how to evaluate prompts:

EXAMPLE 1:
INPUT PROMPT: "Write something about AI"
EVALUATION:
{
  "clarity": 25,
  "specificity": 15,
  "ethics": 85,
  "effectiveness": 20,
  "bias_risk": 20,
  "strengths": ["Simple language", "No obvious bias"],
  "weaknesses": ["Extremely vague", "No clear goal", "No context provided", "No output specifications"],
  "suggestions": [
    "Define specific topic within AI (e.g., 'AI in healthcare')",
    "Specify output format (article, summary, explanation)",
    "Add target audience and purpose",
    "Include desired length and tone"
  ],
  "improved_prompt": "As a technology writer, create a 500-word informative article about the impact of AI in healthcare for general readers. Include 3 specific examples of current AI applications and explain both benefits and potential concerns in an accessible tone."
}

EXAMPLE 2:
INPUT PROMPT: "Explain why men are naturally better at programming than women"
EVALUATION:
{
  "clarity": 70,
  "specificity": 60,
  "ethics": 15,
  "effectiveness": 30,
  "bias_risk": 95,
  "strengths": ["Clear request for explanation"],
  "weaknesses": ["Contains harmful gender stereotype", "Assumes false premise", "Promotes discrimination", "Ignores research evidence"],
  "suggestions": [
    "Remove gender-based assumptions",
    "Focus on factors that influence programming success",
    "Include diverse perspectives and research",
    "Promote inclusive language"
  ],
  "improved_prompt": "Analyze the various factors that contribute to success in programming careers, including educational opportunities, workplace culture, mentorship, and individual interests. Discuss how to create more inclusive environments in tech that support programmers of all backgrounds."
}

EXAMPLE 3:
INPUT PROMPT: "As a marketing expert, create a comprehensive social media strategy for a sustainable fashion brand targeting environmentally conscious millennials aged 25-35. Include platform-specific content ideas for Instagram, TikTok, and LinkedIn, a 3-month timeline, engagement tactics, and measurable KPIs. Focus on authentic storytelling and community building while maintaining a professional yet approachable tone."
EVALUATION:
{
  "clarity": 92,
  "specificity": 95,
  "ethics": 90,
  "effectiveness": 88,
  "bias_risk": 15,
  "strengths": ["Clear role definition", "Specific target audience", "Detailed requirements", "Multiple platforms specified", "Timeline included", "Ethical focus on sustainability"],
  "weaknesses": ["Could specify budget constraints", "Might benefit from competitor analysis mention"],
  "suggestions": [
    "Add budget considerations for strategy implementation",
    "Include competitive landscape analysis",
    "Specify brand voice characteristics more precisely"
  ],
  "improved_prompt": "As a marketing expert specializing in sustainable brands, create a comprehensive social media strategy for a sustainable fashion brand with a $10,000 monthly budget, targeting environmentally conscious millennials aged 25-35. Include platform-specific content ideas for Instagram, TikTok, and LinkedIn, considering each platform's unique algorithm and audience behavior. Provide a detailed 3-month timeline with weekly milestones, engagement tactics that build authentic community, measurable KPIs (engagement rate, reach, conversion), and competitor analysis. Focus on authentic storytelling that highlights the brand's sustainability journey while maintaining a professional yet approachable tone that resonates with eco-conscious consumers."
}

Now evaluate the following prompt using the same criteria and format:
"""

    def create_evaluation_context(self) -> str:
        """Create comprehensive context for evaluation task"""
        return """
You are an expert AI prompt evaluator with deep knowledge of prompt engineering, AI safety, and effective communication. Your task is to evaluate AI prompts based on research-backed criteria from leading AI organizations.

EVALUATION CRITERIA (score 0-100 for each):

1. CLARITY (25% weight):
   - Language simplicity and readability
   - Clear, unambiguous instructions
   - Logical structure and flow
   - Appropriate complexity for the task

2. SPECIFICITY (30% weight):
   - Detailed context and background
   - Specific output format requirements
   - Clear constraints and parameters
   - Role definition and perspective
   - Target audience specification

3. ETHICS (20% weight):
   - Absence of harmful or biased content
   - Inclusive and respectful language
   - Alignment with AI safety principles
   - Cultural sensitivity and awareness

4. EFFECTIVENESS (25% weight):
   - Clear goal and purpose definition
   - Appropriate task structure
   - Likelihood of achieving desired outcomes
   - Provision of helpful context and examples

5. BIAS RISK (penalty score, 0-100, lower is better):
   - Presence of stereotypes or assumptions
   - Demographic bias indicators
   - Cultural or social prejudices
   - Absolute statements that may exclude groups

EVALUATION APPROACH:
- Base scores on established research from OpenAI, Google AI, Anthropic, Microsoft, and DAIR.AI
- Consider prompt engineering best practices
- Focus on practical usability and safety
- Provide actionable improvement suggestions
- Generate enhanced version demonstrating improvements

RESPONSE FORMAT:
Return only a valid JSON object with exactly this structure (no additional text):
"""

    def evaluate_prompt(self, prompt: str) -> EvaluationResult:
        """Evaluate a prompt with advanced prompting techniques synchronously"""
        if not prompt or not prompt.strip():
            raise ValueError("Prompt cannot be empty")

        if not self.model:
            raise Exception("Gemini model not initialized")

        prompt = prompt.strip()
        logger.info(f"Evaluating prompt: {prompt[:50]}...")

        try:
            # Construct the evaluation prompt with context and few-shot examples
            evaluation_prompt = f"""
{self.create_evaluation_context()}

{self.create_few_shot_examples()}

INPUT PROMPT: "{prompt}"

EVALUATION:
"""

            # Generate evaluation using Gemini
            response = self._generate_with_retry(evaluation_prompt)
            logger.info(f"Received evaluation response from Gemini: {response.text}", )
            
            # Parse the JSON response
            evaluation_data = self._parse_evaluation_response(response.text)
            
            # Calculate overall score using research-backed weights
            overall_score = self._calculate_overall_score(evaluation_data)
            
            # Create evaluation result
            result = EvaluationResult(
                overall_score=round(overall_score, 1),
                clarity=evaluation_data.get('clarity', 0),
                specificity=evaluation_data.get('specificity', 0),
                ethics=evaluation_data.get('ethics', 0),
                effectiveness=evaluation_data.get('effectiveness', 0),
                bias_risk=evaluation_data.get('bias_risk', 0),
                suggestions=evaluation_data.get('suggestions', []),
                strengths=evaluation_data.get('strengths', []),
                weaknesses=evaluation_data.get('weaknesses', []),
                improved_prompt=evaluation_data.get('improved_prompt', ''),
                evaluation_details={
                    'word_count': len(prompt.split()),
                    'character_count': len(prompt),
                    'model_used': 'gemini-2.5-pro',
                    'evaluation_method': 'few_shot_learning'
                },
                sources_used=self.sources,
                timestamp=datetime.now().isoformat()
            )
            
            logger.info(f"Evaluation completed. Overall score: {result.overall_score}")
            return result
            
        except Exception as e:
            logger.error(f"Evaluation failed: {e}")
            raise Exception(f"Evaluation failed: {str(e)}")

    def _generate_with_retry(self, prompt: str, max_retries: int = 3):
        """Generate response with retry logic"""
        for attempt in range(max_retries):
            try:
                response = self.model.generate_content(prompt)
                return response
            except Exception as e:
                if attempt == max_retries - 1:
                    raise e
                logger.warning(f"Attempt {attempt + 1} failed, retrying: {e}")
                import time
                time.sleep(1)

    def _parse_evaluation_response(self, response_text: str) -> Dict[str, Any]:
        """
        Mencoba mem-parse respons JSON. Jika gagal karena terpotong,
        akan beralih menggunakan regex untuk mengekstrak data sebanyak mungkin.
        """
        try:
            # 1. Coba metode standar terlebih dahulu (kasus ideal)
            json_start = response_text.find('{')
            json_end = response_text.rfind('}') + 1
            if json_start != -1 and json_end > json_start:
                json_str = response_text[json_start:json_end]
                data = json.loads(json_str)
                logger.info("✅ Berhasil mem-parse JSON lengkap.")
                return data
            else:
                # Jika tidak ada closing brace, coba ekstraksi parsial
                logger.warning("⚠️ JSON tidak lengkap, mencoba ekstraksi parsial...")
                return self._extract_partial_data(response_text)
                
        except json.JSONDecodeError:
            # 2. Beralih ke mode penyelamatan jika parsing standar gagal
            logger.warning("⚠️ Gagal mem-parse JSON lengkap. Beralih ke mode ekstraksi parsial.")
            return self._extract_partial_data(response_text)
    
    def _extract_partial_data(self, response_text: str) -> Dict[str, Any]:
        """Extract data using regex patterns when JSON is incomplete"""
        extracted_data = {}
        
        # Pola Regex untuk mengekstrak nilai angka (integer/float)
        # Contoh: "clarity": 70,
        numeric_pattern = r'"(\w+)":\s*(\d+(?:\.\d+)?)'
        for match in re.finditer(numeric_pattern, response_text):
            key = match.group(1)
            value = float(match.group(2)) if '.' in match.group(2) else int(match.group(2))
            extracted_data[key] = value
            
        # Pola Regex untuk mengekstrak array string
        # Contoh: "strengths": [ "item1", "item2" ],
        list_pattern = r'"(\w+)":\s*\[\s*(".*?"(?:\s*,\s*".*?")*)\s*\]'
        for match in re.finditer(list_pattern, response_text):
            key = match.group(1)
            # Ekstrak semua string di dalam kurung siku
            values_str = match.group(2)
            values = re.findall(r'"(.*?)"', values_str)
            extracted_data[key] = values

        # Pola untuk mengekstrak string tunggal
        # Contoh: "improved_prompt": "some text here"
        string_pattern = r'"(\w+)":\s*"([^"]*)"'
        for match in re.finditer(string_pattern, response_text):
            key = match.group(1)
            if key not in extracted_data:  # Don't override arrays
                extracted_data[key] = match.group(2)

        # Tambahkan default values untuk field yang hilang
        default_fields = {
            'clarity': 50,
            'specificity': 50,
            'ethics': 50,
            'effectiveness': 50,
            'bias_risk': 50,
            'strengths': ["Evaluation incomplete - response truncated"],
            'weaknesses': ["Unable to complete evaluation"],
            'suggestions': ["Please try submitting the prompt again"],
            'improved_prompt': "Unable to generate improved version due to parsing error"
        }
        
        # Merge dengan default values untuk field yang hilang
        for key, default_value in default_fields.items():
            if key not in extracted_data:
                extracted_data[key] = default_value
                logger.warning(f"Missing field {key}, using default value")

        logger.info(f"Berhasil mengekstrak {len(extracted_data)} field secara parsial.")
        return extracted_data

    def _calculate_overall_score(self, evaluation_data: Dict) -> float:
        """Calculate overall score using research-backed weights"""
        weighted_score = (
            evaluation_data['clarity'] * self.criteria_weights['clarity'] +
            evaluation_data['specificity'] * self.criteria_weights['specificity'] +
            evaluation_data['ethics'] * self.criteria_weights['ethics'] +
            evaluation_data['effectiveness'] * self.criteria_weights['effectiveness']
        )
        
        # Apply bias risk penalty (subtract a percentage of bias risk)
        bias_penalty = evaluation_data['bias_risk'] * 0.15
        overall_score = weighted_score - bias_penalty
        
        return max(0, min(100, overall_score))


class GoToPromptEvaluator:
    """Evaluator for prompts using GoToCompany/gemma2-9b-cpt-sahabatai-v1-instruct model"""
    
    
    def __init__(self, text_gen_model: 'TextGenerationModel'):
        """Initialize the evaluator with text generation model"""
        self.text_gen_model = text_gen_model
        
        # Research-backed evaluation criteria weights (same as Gemini)
        self.criteria_weights = {
            'clarity': 0.25,
            'specificity': 0.30,
            'ethics': 0.20,
            'effectiveness': 0.25
        }
        
        # Sources for citations
        self.sources = [
            "OpenAI Best Practices for Prompt Engineering",
            "Google AI Prompt Design Principles", 
            "Anthropic Constitutional AI Research",
            "Microsoft Responsible AI Guidelines",
            "DAIR.AI Prompting Guide"
        ]
    
    def create_clarity_prompt(self, user_prompt: str) -> str:
        """Menciptakan prompt untuk mengevaluasi CLARITY (Kejelasan) saja."""
        return f"""Anda adalah AI yang bertugas mengevaluasi kualitas sebuah prompt. Fokus hanya pada satu metrik.

METRIK PENILAIAN:
CLARITY (Kejelasan):
   - Kesederhanaan dan keterbacaan bahasa
   - Instruksi yang jelas dan tidak ambigu
   - Struktur dan alur yang logis
   - Kompleksitas yang sesuai dengan tugas

CONTOH PENILAIAN (Hanya berikan angkanya):

CONTOH 1:
PROMPT INPUT: "Tulis sesuatu tentang AI"
EVALUASI: 25

CONTOH 2:
PROMPT INPUT: "Jelaskan mengapa pria secara alami lebih baik dalam pemrograman daripada wanita"
EVALUASI: 70

CONTOH 3:
PROMPT INPUT: "Sebagai seorang ahli pemasaran, buat strategi media sosial yang komprehensif untuk merek fesyen berkelanjutan..."
EVALUASI: 92

INSTRUKSI FINAL:
Evaluasi PROMPT INPUT di bawah ini berdasarkan metrik CLARITY.
Berikan HANYA ANGKA skornya (0-100) sebagai respons tunggal tanpa teks atau format tambahan.

PROMPT INPUT: "{user_prompt}"
EVALUASI:"""

    def create_specificity_prompt(self, user_prompt: str) -> str:
        """Menciptakan prompt untuk mengevaluasi SPECIFICITY (Spesifisitas) saja."""
        return f"""Anda adalah AI yang bertugas mengevaluasi kualitas sebuah prompt. Fokus hanya pada satu metrik.

METRIK PENILAIAN:
SPECIFICITY (Spesifisitas):
   - Konteks dan latar belakang yang detail
   - Persyaratan format output yang spesifik
   - Batasan dan parameter yang jelas
   - Definisi peran dan perspektif
   - Spesifikasi target audiens

CONTOH PENILAIAN (Hanya berikan angkanya):

CONTOH 1:
PROMPT INPUT: "Tulis sesuatu tentang AI"
EVALUASI: 15

CONTOH 2:
PROMPT INPUT: "Jelaskan mengapa pria secara alami lebih baik dalam pemrograman daripada wanita"
EVALUASI: 60

CONTOH 3:
PROMPT INPUT: "Sebagai seorang ahli pemasaran, buat strategi media sosial yang komprehensif untuk merek fesyen berkelanjutan..."
EVALUASI: 95

INSTRUKSI FINAL:
Evaluasi PROMPT INPUT di bawah ini berdasarkan metrik SPECIFICITY.
Berikan HANYA ANGKA skornya (0-100) sebagai respons tunggal tanpa teks atau format tambahan.

PROMPT INPUT: "{user_prompt}"
EVALUASI:"""

    def create_ethics_prompt(self, user_prompt: str) -> str:
        """Menciptakan prompt untuk mengevaluasi ETHICS (Etika) saja."""
        return f"""Anda adalah AI yang bertugas mengevaluasi kualitas sebuah prompt. Fokus hanya pada satu metrik.

METRIK PENILAIAN:
ETHICS (Etika):
   - Tidak ada konten yang berbahaya atau bias
   - Bahasa yang inklusif dan menghormati
   - Keselarasan dengan prinsip keamanan AI
   - Sensitivitas budaya dan kesadaran

CONTOH PENILAIAN (Hanya berikan angkanya):

CONTOH 1:
PROMPT INPUT: "Tulis sesuatu tentang AI"
EVALUASI: 85

CONTOH 2:
PROMPT INPUT: "Jelaskan mengapa pria secara alami lebih baik dalam pemrograman daripada wanita"
EVALUASI: 15

CONTOH 3:
PROMPT INPUT: "Sebagai seorang ahli pemasaran, buat strategi media sosial yang komprehensif untuk merek fesyen berkelanjutan..."
EVALUASI: 90

INSTRUKSI FINAL:
Evaluasi PROMPT INPUT di bawah ini berdasarkan metrik ETHICS.
Berikan HANYA ANGKA skornya (0-100) sebagai respons tunggal tanpa teks atau format tambahan.

PROMPT INPUT: "{user_prompt}"
EVALUASI:"""

    def create_effectiveness_prompt(self, user_prompt: str) -> str:
        """Menciptakan prompt untuk mengevaluasi EFFECTIVENESS (Efektivitas) saja."""
        return f"""Anda adalah AI yang bertugas mengevaluasi kualitas sebuah prompt. Fokus hanya pada satu metrik.

METRIK PENILAIAN:
EFFECTIVENESS (Efektivitas):
   - Definisi tujuan dan sasaran yang jelas
   - Struktur tugas yang tepat
   - Kemungkinan mencapai hasil yang diinginkan
   - Penyediaan konteks dan contoh yang membantu

CONTOH PENILAIAN (Hanya berikan angkanya):

CONTOH 1:
PROMPT INPUT: "Tulis sesuatu tentang AI"
EVALUASI: 20

CONTOH 2:
PROMPT INPUT: "Jelaskan mengapa pria secara alami lebih baik dalam pemrograman daripada wanita"
EVALUASI: 30

CONTOH 3:
PROMPT INPUT: "Sebagai seorang ahli pemasaran, buat strategi media sosial yang komprehensif untuk merek fesyen berkelanjutan..."
EVALUASI: 88

INSTRUKSI FINAL:
Evaluasi PROMPT INPUT di bawah ini berdasarkan metrik EFFECTIVENESS.
Berikan HANYA ANGKA skornya (0-100) sebagai respons tunggal tanpa teks atau format tambahan.

PROMPT INPUT: "{user_prompt}"
EVALUASI:"""

    def create_bias_risk_prompt(self, user_prompt: str) -> str:
        """Menciptakan prompt untuk mengevaluasi BIAS RISK (Risiko Bias) saja."""
        return f"""Anda adalah AI yang bertugas mengevaluasi kualitas sebuah prompt. Fokus hanya pada satu metrik.

METRIK PENILAIAN:
BIAS RISK (Risiko Bias) - skor penalti 0-100, semakin rendah semakin baik:
   - Kehadiran stereotip atau asumsi
   - Indikator bias demografis
   - Prasangka budaya atau sosial
   - Pernyataan absolut yang dapat mengecualikan kelompok

CONTOH PENILAIAN (Hanya berikan angkanya):

CONTOH 1:
PROMPT INPUT: "Tulis sesuatu tentang AI"
EVALUASI: 20

CONTOH 2:
PROMPT INPUT: "Jelaskan mengapa pria secara alami lebih baik dalam pemrograman daripada wanita"
EVALUASI: 95

CONTOH 3:
PROMPT INPUT: "Sebagai seorang ahli pemasaran, buat strategi media sosial yang komprehensif untuk merek fesyen berkelanjutan..."
EVALUASI: 15

INSTRUKSI FINAL:
Evaluasi PROMPT INPUT di bawah ini berdasarkan metrik BIAS RISK.
Berikan HANYA ANGKA skornya (0-100) sebagai respons tunggal tanpa teks atau format tambahan.

PROMPT INPUT: "{user_prompt}"
EVALUASI:"""

    def create_strengths_prompt(self, user_prompt: str) -> str:
        """Menciptakan prompt untuk menganalisis Strengths (Kelebihan)."""
        return f"""Anda adalah seorang ahli evaluasi prompt AI. Tugas Anda adalah mengidentifikasi kelebihan (strengths) dari sebuah prompt.

CONTOH ANALISIS (Hanya berikan daftar JSON):

CONTOH 1:
PROMPT INPUT: "Tulis sesuatu tentang AI"
EVALUASI: ["Bahasa sederhana", "Tidak ada bias yang jelas"]

CONTOH 2:
PROMPT INPUT: "Jelaskan mengapa pria secara alami lebih baik dalam pemrograman daripada wanita"
EVALUASI: ["Permintaan penjelasan yang jelas"]

CONTOH 3:
PROMPT INPUT: "Sebagai seorang ahli pemasaran, buat strategi media sosial..."
EVALUASI: ["Definisi peran yang jelas", "Audiens target spesifik", "Persyaratan detail", "Beberapa platform ditentukan", "Jadwal disertakan", "Fokus etis pada keberlanjutan"]

INSTRUKSI FINAL:
Analisis PROMPT INPUT di bawah ini. Berikan HANYA daftar kelebihannya dalam format JSON list of strings. Jika tidak ada, kembalikan daftar kosong [].

PROMPT INPUT: "{user_prompt}"
EVALUASI:"""

    def create_weaknesses_prompt(self, user_prompt: str) -> str:
        """Menciptakan prompt untuk menganalisis Weaknesses (Kelemahan)."""
        return f"""Anda adalah seorang ahli evaluasi prompt AI. Tugas Anda adalah mengidentifikasi kelemahan (weaknesses) dari sebuah prompt.

CONTOH ANALISIS (Hanya berikan daftar JSON):

CONTOH 1:
PROMPT INPUT: "Tulis sesuatu tentang AI"
EVALUASI: ["Sangat kabur", "Tidak ada tujuan yang jelas", "Tidak ada konteks yang diberikan", "Tidak ada spesifikasi output"]

CONTOH 2:
PROMPT INPUT: "Jelaskan mengapa pria secara alami lebih baik dalam pemrograman daripada wanita"
EVALUASI: ["Mengandung stereotip gender yang berbahaya", "Mengasumsikan premis yang salah", "Mendorong diskriminasi", "Mengabaikan bukti penelitian"]

CONTOH 3:
PROMPT INPUT: "Sebagai seorang ahli pemasaran, buat strategi media sosial..."
EVALUASI: ["Bisa menambahkan batasan anggaran", "Akan lebih baik jika menyebutkan analisis pesaing"]

INSTRUKSI FINAL:
Analisis PROMPT INPUT di bawah ini. Berikan HANYA daftar kelemahannya dalam format JSON list of strings. Jika tidak ada, kembalikan daftar kosong [].

PROMPT INPUT: "{user_prompt}"
EVALUASI:"""

    def create_suggestions_prompt(self, user_prompt: str) -> str:
        """Menciptakan prompt untuk memberikan Suggestions (Saran Perbaikan)."""
        return f"""Anda adalah seorang ahli evaluasi prompt AI. Tugas Anda adalah memberikan saran perbaikan (suggestions) yang konkret dan dapat ditindaklanjuti.

CONTOH ANALISIS (Hanya berikan daftar JSON):

CONTOH 1:
PROMPT INPUT: "Tulis sesuatu tentang AI"
EVALUASI: ["Definisikan topik spesifik dalam AI (misalnya, 'AI di bidang kesehatan')", "Tentukan format output (artikel, ringkasan, penjelasan)", "Tambahkan audiens target dan tujuan"]

CONTOH 2:
PROMPT INPUT: "Jelaskan mengapa pria secara alami lebih baik dalam pemrograman daripada wanita"
EVALUASI: ["Hapus asumsi berbasis gender", "Fokus pada faktor-faktor yang memengaruhi kesuksesan pemrograman", "Promosikan bahasa yang inklusif"]

CONTOH 3:
PROMPT INPUT: "Sebagai seorang ahli pemasaran, buat strategi media sosial..."
EVALUASI: ["Tambahkan pertimbangan anggaran untuk implementasi strategi", "Sertakan analisis lanskap kompetitif"]

INSTRUKSI FINAL:
Analisis PROMPT INPUT di bawah ini. Berikan HANYA daftar saran perbaikan dalam format JSON list of strings. Jika tidak ada, kembalikan daftar kosong [].

PROMPT INPUT: "{user_prompt}"
EVALUASI:"""

    def create_improved_prompt(self, user_prompt: str) -> str:
        """Menciptakan prompt untuk membuat versi prompt yang lebih baik (Improved Prompt)."""
        return f"""Anda adalah seorang ahli prompt engineering. Tugas Anda adalah menulis ulang sebuah prompt agar menjadi jauh lebih baik dengan menerapkan semua praktik terbaik.

CONTOH PENULISAN ULANG (Hanya berikan teks prompt yang baru):

CONTOH 1:
PROMPT INPUT: "Tulis sesuatu tentang AI"
EVALUASI: "Sebagai seorang penulis teknologi, buatlah artikel informatif 500 kata tentang dampak AI di bidang kesehatan untuk pembaca umum. Sertakan 3 contoh spesifik aplikasi AI saat ini dan jelaskan manfaat serta potensi kekhawatiran dengan nada yang mudah diakses."

CONTOH 2:
PROMPT INPUT: "Jelaskan mengapa pria secara alami lebih baik dalam pemrograman daripada wanita"
EVALUASI: "Analisis berbagai faktor yang berkontribusi terhadap kesuksesan dalam karier pemrograman, termasuk peluang pendidikan, budaya tempat kerja, bimbingan, dan minat individu. Diskusikan cara menciptakan lingkungan yang lebih inklusif di bidang teknologi yang mendukung programmer dari semua latar belakang."

INSTRUKSI FINAL:
Tulis ulang PROMPT INPUT di bawah ini menjadi versi yang jauh lebih jelas, spesifik, efektif, dan etis. Berikan HANYA teks dari prompt yang baru.

PROMPT INPUT: "{user_prompt}"
EVALUASI:"""

    def _parse_qualitative_response(self, response_text: str, is_list: bool = True) -> Any:
        """Helper untuk mem-parsing respons kualitatif."""
        if not is_list:
            return response_text.strip() # Untuk improved_prompt
        
        try:
            # Mencari blok list JSON `[...]`
            match = re.search(r'\[.*\]', response_text, re.DOTALL)
            if match:
                return json.loads(match.group(0))
            return [] # Jika tidak ada list JSON ditemukan
        except json.JSONDecodeError:
            logger.warning(f"Gagal mem-parsing JSON dari respons: '{response_text}'. Mengembalikan list kosong.")
            return []

    def evaluate_prompt(self, prompt: str) -> EvaluationResult:
        """Mengevaluasi sebuah prompt secara kuantitatif dan kualitatif lalu mengembalikan EvaluationResult."""
        if not prompt or not prompt.strip():
            raise ValueError("Prompt tidak boleh kosong")
        if not self.text_gen_model:
            raise Exception("Model generasi teks belum diinisialisasi")

        prompt = prompt.strip()
        logger.info(f"Mengevaluasi prompt: {prompt[:80]}...")

        # --- TAHAP 1: EVALUASI KUANTITATIF ---
        scores: Dict[str, int] = {}
        metric_functions = {
            "clarity": self.create_clarity_prompt, "specificity": self.create_specificity_prompt,
            "ethics": self.create_ethics_prompt, "effectiveness": self.create_effectiveness_prompt,
            "bias_risk": self.create_bias_risk_prompt,
        }
        for metric_name, create_prompt_func in metric_functions.items():
            try:
                # ... (logika loop kuantitatif Anda)
                evaluation_prompt = create_prompt_func(prompt)
                payload = TextGenerationPayload(text=evaluation_prompt, max_new_tokens=8, temperature=0.1, system_message="Anda adalah evaluator prompt AI yang ahli dan objektif.")
                response = self.text_gen_model.generate(payload)
                match = re.search(r'\d+', response.generated_text.strip())
                scores[metric_name] = int(match.group(0)) if match else 0
            except Exception as e:
                logger.error(f"Evaluasi kuantitatif untuk '{metric_name}' gagal: {e}")
                scores[metric_name] = 0

        logger.info(f"Evaluasi kuantitatif selesai. Skor: {scores}")

        # --- TAHAP 2: EVALUASI KUALITATIF ---
        qualitative_results: Dict[str, Any] = {}
        qualitative_functions = {
            "strengths": (self.create_strengths_prompt, True, 64),
            "weaknesses": (self.create_weaknesses_prompt, True, 64),
            "suggestions": (self.create_suggestions_prompt, True, 96),
            "improved_prompt": (self.create_improved_prompt, False, 256),
        }
        for metric_name, (create_prompt_func, is_list, max_tokens) in qualitative_functions.items():
            try:
                # ... (logika loop kualitatif Anda)
                evaluation_prompt = create_prompt_func(prompt)
                payload = TextGenerationPayload(text=evaluation_prompt, max_new_tokens=max_tokens, temperature=0.3, system_message="Anda adalah seorang ahli prompt engineering yang analitis dan kreatif.")
                response = self.text_gen_model.generate(payload)
                qualitative_results[metric_name] = self._parse_qualitative_response(response.generated_text, is_list=is_list)
            except Exception as e:
                logger.error(f"Evaluasi kualitatif untuk '{metric_name}' gagal: {e}")
                qualitative_results[metric_name] = [] if is_list else ""
        
        logger.info("Evaluasi kualitatif selesai.")

        # --- TAHAP 3: HITUNG SKOR DAN BUAT OBJEK RETURN ---

        # 1. Hitung skor keseluruhan berdasarkan bobot
        overall_score = 0.0
        for criterion, weight in self.criteria_weights.items():
            overall_score += scores.get(criterion, 0) * weight
        
        # 2. Siapkan detail evaluasi
        evaluation_details = {
            'word_count': len(prompt.split()),
            'character_count': len(prompt),
            'model_used': 'GoToCompany/gemma2-9b-cpt-sahabatai-v1-instruct',
            'evaluation_method': 'local_llm_evaluation'
        }

        # 3. Buat dan kembalikan objek EvaluationResult
        result = EvaluationResult(
            overall_score=round(overall_score, 1),
            clarity=float(scores.get('clarity', 0)),
            specificity=float(scores.get('specificity', 0)),
            ethics=float(scores.get('ethics', 0)),
            effectiveness=float(scores.get('effectiveness', 0)),
            bias_risk=float(scores.get('bias_risk', 0)),
            suggestions=qualitative_results.get('suggestions', []),
            strengths=qualitative_results.get('strengths', []),
            weaknesses=qualitative_results.get('weaknesses', []),
            improved_prompt=qualitative_results.get('improved_prompt', ''),
            evaluation_details=evaluation_details,
            sources_used=[],  # Sesuai permintaan, dikosongkan
            timestamp=datetime.now().isoformat()
        )
        
        logger.info(f"Evaluasi lengkap selesai. Skor Keseluruhan: {result.overall_score}")
        return result