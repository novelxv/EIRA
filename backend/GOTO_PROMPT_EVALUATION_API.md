# GoTo Prompt Evaluation API Documentation

## Overview

The GoTo Prompt Evaluation API provides an endpoint for evaluating AI prompts using the **GoToCompany/gemma2-9b-cpt-sahabatai-v1-instruct** model. This is specifically designed for Indonesian/Javanese language contexts and cultural considerations.

## Endpoint

### POST `/api/v1/evaluate-goto`

Evaluate AI prompts using the GoTo model with advanced criteria adjusted for Indonesian language and culture.

#### Request Body

```json
{
  "prompt": "Your AI prompt to evaluate"
}
```

#### Response

```json
{
  "overall_score": 85.2,
  "clarity": 90,
  "specificity": 85,
  "ethics": 95,
  "effectiveness": 80,
  "bias_risk": 15,
  "strengths": [
    "Clear and well-structured instructions",
    "Appropriate for target audience",
    "Good use of context"
  ],
  "weaknesses": [
    "Could be more specific about output format",
    "Missing some cultural context"
  ],
  "suggestions": [
    "Add specific output format requirements",
    "Include target audience definition",
    "Consider Indonesian cultural context"
  ],
  "improved_prompt": "Enhanced version of your prompt with improvements",
  "evaluation_details": {
    "word_count": 25,
    "character_count": 150,
    "model_used": "GoToCompany/gemma2-9b-cpt-sahabatai-v1-instruct",
    "evaluation_method": "local_llm_evaluation"
  },
  "sources_used": [
    "OpenAI Best Practices for Prompt Engineering",
    "Google AI Prompt Design Principles",
    "Anthropic Constitutional AI Research",
    "Microsoft Responsible AI Guidelines",
    "DAIR.AI Prompting Guide"
  ],
  "timestamp": "2025-07-25T10:30:00.000Z",
  "success": true
}
```

## Features

### 🇮🇩 **Indonesian Language Optimization**
- Evaluation prompts in Indonesian language
- Cultural sensitivity considerations
- Local context awareness

### 🤖 **Local LLM Evaluation**
- Uses GoTo model with 8-bit quantization
- No external API dependencies
- Privacy-focused (data stays local)

### 📊 **Comprehensive Scoring**
- **Clarity** (25% weight): Language simplicity and readability
- **Specificity** (30% weight): Detail level and context provision
- **Ethics** (20% weight): Bias avoidance and inclusivity
- **Effectiveness** (25% weight): Goal achievement likelihood
- **Bias Risk** (penalty): Stereotype and assumption detection

### 🔧 **Advanced Features**
- Research-backed evaluation criteria
- Actionable improvement suggestions
- Enhanced prompt generation
- Detailed analysis metrics

## Usage Examples

### Example 1: Basic Prompt Evaluation

```bash
curl -X POST "http://localhost:8000/api/v1/evaluate-goto" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "prompt": "Buatlah panduan lengkap tentang machine learning untuk pemula"
  }'
```

### Example 2: Marketing Prompt

```bash
curl -X POST "http://localhost:8000/api/v1/evaluate-goto" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "prompt": "Sebagai ahli marketing digital, buatkan strategi media sosial untuk UMKM kuliner lokal dengan budget terbatas. Target: usia 25-40 di area metropolitan. Fokus platform Instagram dan TikTok. Sertakan timeline 3 bulan dan metrik KPI yang realistis."
  }'
```

### Example 3: Educational Content

```bash
curl -X POST "http://localhost:8000/api/v1/evaluate-goto" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "prompt": "Jelaskan konsep kecerdasan buatan dalam bahasa yang mudah dipahami untuk siswa SMA, termasuk contoh aplikasi dalam kehidupan sehari-hari di Indonesia"
  }'
```

## Evaluation Criteria

### 1. Clarity (Kejelasan) - 25%
- **Kesederhanaan bahasa**: Apakah prompt menggunakan bahasa yang mudah dipahami?
- **Instruksi yang jelas**: Apakah perintah tidak ambigu dan spesifik?
- **Struktur logis**: Apakah prompt terorganisir dengan baik?

### 2. Specificity (Spesifisitas) - 30%
- **Detail konteks**: Apakah prompt memberikan latar belakang yang cukup?
- **Format output**: Apakah format hasil yang diinginkan dijelaskan?
- **Batasan yang jelas**: Apakah ada parameter dan constraint yang spesifik?

### 3. Ethics (Etika) - 20%
- **Tidak ada bias**: Apakah prompt bebas dari stereotip dan prasangka?
- **Bahasa inklusif**: Apakah menggunakan bahasa yang menghormati semua kelompok?
- **Sensitivitas budaya**: Apakah mempertimbangkan konteks budaya Indonesia?

### 4. Effectiveness (Efektivitas) - 25%
- **Tujuan yang jelas**: Apakah prompt memiliki sasaran yang didefinisikan dengan baik?
- **Struktur yang tepat**: Apakah organisasi prompt mendukung pencapaian tujuan?
- **Konteks yang membantu**: Apakah ada informasi pendukung yang relevan?

### 5. Bias Risk (Risiko Bias) - Penalty
- **Stereotip demografis**: Deteksi asumsi berdasarkan gender, usia, dll.
- **Bias budaya**: Identifikasi prasangka terhadap kelompok tertentu
- **Pernyataan absolut**: Pengecekan generalisasi yang berlebihan

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `overall_score` | number | Overall evaluation score (0-100) |
| `clarity` | number | Clarity score (0-100) |
| `specificity` | number | Specificity score (0-100) |
| `ethics` | number | Ethics score (0-100) |
| `effectiveness` | number | Effectiveness score (0-100) |
| `bias_risk` | number | Bias risk score (0-100, lower is better) |
| `strengths` | array | List of prompt strengths |
| `weaknesses` | array | List of areas for improvement |
| `suggestions` | array | Actionable improvement recommendations |
| `improved_prompt` | string | Enhanced version of the prompt |
| `evaluation_details` | object | Technical evaluation metadata |
| `sources_used` | array | Research sources for evaluation criteria |
| `timestamp` | string | ISO timestamp of evaluation |
| `success` | boolean | Whether evaluation completed successfully |

## Error Handling

### Common Error Responses

#### 400 - Bad Request
```json
{
  "detail": "Prompt is required"
}
```

#### 400 - Empty Prompt
```json
{
  "detail": "Prompt cannot be empty"
}
```

#### 400 - Prompt Too Long
```json
{
  "detail": "Prompt too long (max 3000 characters)"
}
```

#### 500 - Model Not Initialized
```json
{
  "detail": "Text generation model not initialized"
}
```

#### 500 - Evaluation Failed
```json
{
  "detail": "GoTo evaluation failed: [error details]"
}
```

## Comparison with Gemini Evaluator

| Feature | GoTo Evaluator | Gemini Evaluator |
|---------|---------------|------------------|
| **Language** | Indonesian/Javanese optimized | English optimized |
| **Model** | GoToCompany/gemma2-9b-cpt-sahabatai-v1-instruct | gemini-2.5-pro |
| **Deployment** | Local (8-bit quantized) | Cloud API |
| **Privacy** | Complete privacy | API-dependent |
| **Cultural Context** | Indonesian culture | Global context |
| **Latency** | Depends on hardware | API latency |
| **Cost** | Free (after setup) | Per-request cost |

## Best Practices

### For Indonesian Prompts
1. **Gunakan konteks budaya**: Sertakan referensi yang relevan dengan Indonesia
2. **Bahasa yang sesuai**: Gunakan bahasa Indonesia yang formal atau informal sesuai target
3. **Contoh lokal**: Berikan contoh yang familiar dengan audiens Indonesia

### For Optimal Results
1. **Be specific**: Provide detailed context and requirements
2. **Define output**: Clearly specify desired format and length
3. **Include examples**: Provide relevant examples when possible
4. **Consider audience**: Define target audience explicitly

## Testing

Use the provided test script to verify the implementation:

```bash
cd backend
python test_goto_prompt_evaluation.py
```

## Dependencies

- Text generation model (GoTo) must be initialized
- 8-bit quantization support (bitsandbytes)
- Sufficient GPU memory (6-8GB)

## Limitations

1. **Hardware requirements**: Needs sufficient GPU memory
2. **Indonesian focus**: Optimized for Indonesian language and culture
3. **Model limitations**: Depends on GoTo model capabilities
4. **Evaluation consistency**: May vary compared to cloud-based solutions

## Future Improvements

- [ ] Multi-language support within Indonesian context
- [ ] Batch evaluation capabilities
- [ ] Custom evaluation criteria configuration
- [ ] Integration with local Indonesian AI research guidelines
