import os
import json
import asyncio
from datetime import datetime
from typing import Dict, List, Optional
from dataclasses import dataclass, asdict
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv
import logging
import threading

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class EvaluationResult:
    """Data class for storing evaluation results"""
    overall_score: float
    clarity: float
    specificity: float
    ethics: float
    effectiveness: float
    bias_risk: float
    suggestions: List[str]
    strengths: List[str]
    weaknesses: List[str]
    improved_prompt: str
    evaluation_details: Dict
    sources_used: List[str]
    timestamp: str

    def to_dict(self) -> Dict:
        """Convert to dictionary for JSON serialization"""
        return asdict(self)

class GeminiPromptEvaluator:
    """Advanced prompt evaluator using Gemini 2.5 Pro with few-shot learning"""
    
    def __init__(self, api_key: Optional[str] = None):
        """Initialize the evaluator with Gemini API"""
        self.api_key = api_key or os.getenv('GEMINI_API_KEY')
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

    def _parse_evaluation_response(self, response_text: str) -> Dict:
        """Parse and validate the evaluation response from Gemini"""
        try:
            # Find JSON in response
            json_start = response_text.find('{')
            json_end = response_text.rfind('}') + 1
            
            if json_start >= 0 and json_end > json_start:
                json_str = response_text[json_start:json_end]
                data = json.loads(json_str)
                
                # Validate required fields
                required_fields = ['clarity', 'specificity', 'ethics', 'effectiveness', 'bias_risk']
                for field in required_fields:
                    if field not in data:
                        raise ValueError(f"Missing required field: {field}")
                    if not isinstance(data[field], (int, float)) or data[field] < 0 or data[field] > 100:
                        raise ValueError(f"Invalid score for {field}: {data[field]}")
                
                return data
            else:
                raise ValueError("No valid JSON found in response")
                
        except json.JSONDecodeError as e:
            logger.error(f"JSON parsing error: {e}")
            raise ValueError(f"Invalid JSON response: {e}")
        except Exception as e:
            logger.error(f"Response parsing error: {e}")
            raise ValueError(f"Response parsing failed: {e}")

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

# Flask API Implementation
app = Flask(__name__)
CORS(app, origins=['http://localhost:5173'])

# Global evaluator instance
evaluator = None

def get_evaluator():
    """Get or create evaluator instance"""
    global evaluator
    if evaluator is None:
        evaluator = GeminiPromptEvaluator()
    return evaluator

@app.route('/evaluate', methods=['POST'])
def evaluate_prompt_endpoint():
    """Main evaluation endpoint"""
    try:
        data = request.get_json()
        if not data or 'prompt' not in data:
            return jsonify({'error': 'Prompt is required'}), 400

        prompt = data.get('prompt', '').strip()
        if not prompt:
            return jsonify({'error': 'Prompt cannot be empty'}), 400

        if len(prompt) > 3000:
            return jsonify({'error': 'Prompt too long (max 3000 characters)'}), 400

        # Get evaluator instance
        eval_instance = get_evaluator()
        
        # Run evaluation
        logger.info(f"API Request: {prompt[:50]}...")
        result = eval_instance.evaluate_prompt(prompt)
        
        # Return response with success flag
        response = result.to_dict()
        response['success'] = True
        logger.info(f"API Response: Score {response['overall_score']}")
        
        return jsonify(response)

    except ValueError as e:
        logger.error(f"Validation error: {e}")
        return jsonify({'error': str(e), 'success': False}), 400
    except Exception as e:
        logger.error(f"Server error: {e}")
        return jsonify({
            'error': 'Internal server error',
            'message': 'Evaluation failed. Please try again.',
            'success': False
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    eval_instance = get_evaluator()
    
    return jsonify({
        'status': 'healthy',
        'service': 'EIRA Prompt Evaluator API',
        'version': '2.0.0',
        'model': 'gemini-2.5-pro',
        'gemini_connected': eval_instance.model is not None,
        'timestamp': datetime.now().isoformat(),
        'success': True,
        'endpoints': {
            'evaluate': 'POST /evaluate',
            'health': 'GET /health'
        }
    })

@app.route('/', methods=['GET'])
def api_info():
    """API documentation endpoint"""
    return jsonify({
        'service': 'EIRA Prompt Evaluator API',
        'description': 'Advanced AI prompt evaluation using Gemini with few-shot learning',
        'version': '2.0.0',
        'model': 'gemini-2.5-pro',
        'features': [
            'Research-based evaluation criteria',
            'Few-shot learning for consistent scoring',
            'Advanced context understanding',
            'Bias detection and safety analysis',
            'Actionable improvement suggestions'
        ],
        'endpoints': {
            'POST /evaluate': {
                'description': 'Evaluate a prompt comprehensively',
                'body': {'prompt': 'string (required, max 3000 chars)'},
                'response': 'detailed evaluation results'
            },
            'GET /health': {
                'description': 'Service health status',
                'response': 'service information and status'
            }
        },
        'example_request': {
            'method': 'POST',
            'url': '/evaluate',
            'headers': {'Content-Type': 'application/json'},
            'body': {
                'prompt': 'As a marketing expert, create a social media strategy for eco-friendly products targeting millennials.'
            }
        },
        'evaluation_criteria': {
            'clarity': 'Language clarity and instruction comprehensibility (25% weight)',
            'specificity': 'Detail level and requirement specification (30% weight)',
            'ethics': 'Bias avoidance and inclusive language (20% weight)',
            'effectiveness': 'Goal achievement likelihood (25% weight)',
            'bias_risk': 'Potential for generating biased outputs (penalty factor)'
        }
    })

@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return jsonify({
        'error': 'Endpoint not found',
        'available_endpoints': ['/', '/health', '/evaluate']
    }), 404

@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors"""
    return jsonify({
        'error': 'Internal server error',
        'message': 'Please try again later'
    }), 500

if __name__ == '__main__':
    # Configure for development
    import sys
    
    # Check if API key is available
    if not os.getenv('GEMINI_API_KEY'):
        print("Error: GEMINI_API_KEY environment variable not found")
        print("Please set your Gemini API key in the .env file")
        sys.exit(1)
    
    # Initialize evaluator to test connection
    test_evaluator = GeminiPromptEvaluator()
    if not test_evaluator.model:
        print("Error: Failed to initialize Gemini model")
        sys.exit(1)
    
    print("EIRA Prompt Evaluator API")
    print("=" * 50)
    print("Model: Gemini 2.5 Pro")
    print("Features: Few-shot learning, Research-based evaluation")
    print("URL: http://localhost:5000")
    print("Endpoints:")
    print("   POST /evaluate - Evaluate prompts")
    print("   GET /health - Health check")
    print("   GET / - API documentation")
    print("=" * 50)
    
    # Run the Flask app
    app.run(debug=True, host='0.0.0.0', port=5000, threaded=True)
