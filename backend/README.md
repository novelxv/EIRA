# EIRA Backend API
> 🤗 HuggingFace + ⚡ FastAPI + 🤖 AI Models = ❤️ Awesomeness

![EIRA API](hf.png)

**EIRA (Enhanced Intelligence Research Assistant)** is a comprehensive AI-powered backend API built with FastAPI, providing multiple AI services including text generation, AI detection, and prompt evaluation capabilities.

## 🙏 Credits

This project is built upon the excellent boilerplate from [huggingfastapi](https://github.com/Proteusiq/huggingfastapi) by Proteusiq. We extend our gratitude for providing such a solid foundation for serving Hugging Face models with FastAPI.

## 🚀 Features

- **🔍 AI Content Detection**: Detect whether text is AI-generated or human-written
- **📝 Text Generation**: Generate text using Gemma2-9B model with 8-bit quantization
- **💬 Chat Interface**: Conversational AI with context awareness
- **🎯 Prompt Evaluation**: Advanced prompt quality assessment using Gemini 2.5 Pro or local models
- **🛡️ Authentication**: API key-based security
- **📊 Health Monitoring**: Service health checks and status endpoints
- **🌐 CORS Support**: Cross-origin resource sharing for web applications

## 📁 Project Structure

```
huggingfastapi/
├── api/                 # Main API layer
│   └── routes/         # Web routes and endpoints
│       ├── heartbeat.py      # Health check endpoints
│       ├── prediction.py     # AI detection endpoints
│       ├── text_generation.py # Text generation endpoints
│       ├── prompt_evaluation.py # Prompt evaluation endpoints
│       └── router.py         # Route configuration
├── core/               # Application configuration
│   ├── config.py           # Environment configuration
│   ├── event_handlers.py   # Startup/shutdown events
│   ├── messages.py         # Error messages
│   └── security.py         # Authentication logic
├── models/             # Pydantic models
│   ├── heartbeat.py        # Health check models
│   ├── payload.py          # Request payload models
│   └── prediction.py       # Response models
├── services/           # Business logic
│   ├── nlp.py             # AI/NLP services
│   ├── text_generation.py # Text generation service
│   └── utils.py           # Utility functions
└── main.py            # FastAPI application entry point

tests/                 # Test suite
├── test_api/          # API endpoint tests
└── test_service/      # Service layer tests

ml_model/              # AI model storage
└── models/            # Downloaded AI models
```

## 🔌 API Endpoints

### Health & Status
- `GET /health/heartbeat` - Basic health check
- `GET /api/v1/health` - Detailed service health status

### AI Content Detection
- `POST /api/v1/detect-ai` - Detect if text is AI-generated or human-written

### Text Generation
- `POST /api/v1/generate-text` - Generate text using Gemma2-9B model
- `POST /api/v1/chat` - Conversational chat interface

### Prompt Evaluation
- `POST /api/v1/evaluate` - Evaluate prompt quality using Gemini 2.5 Pro
- `POST /api/v1/evaluate-goto` - Evaluate prompts using local Gemma2-9B model

## 🛠️ Requirements

- **Python**: 3.8+
- **Memory**: 10-12 GB RAM
- **GPU Memory**: 6-8 GB VRAM (for text generation with 8-bit quantization)
- **Storage**: ~20 GB for models
- **API Keys**: Gemini API key for prompt evaluation

## ⚡ Quick Start

### 1. Environment Setup

```bash
# Clone repository
git clone <repository-url>
cd backend

# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Configuration

```bash
# Copy environment template
cp .env.example .env

# Generate API key
python -c "import uuid; print(str(uuid.uuid4()))"

# Edit .env file with your configuration
# Set API_KEY, GEMINI_API_KEY, and model paths
```

### 3. Text Generation Setup

```bash
# Quick setup (recommended)
./setup_text_generation.sh

# Or manual setup
pip install bitsandbytes==0.46.1 accelerate==1.9.0
python test_text_generation.py
```

### 4. Run the Application

```bash
# Development mode
make run
# OR
PYTHONPATH=./huggingfastapi uvicorn main:app --reload

# Production with Docker
make deploy
```

### 5. Access API Documentation

- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

## 📋 Environment Variables

Create a `.env` file with the following variables:

```env
# API Configuration
API_KEY=your-generated-uuid-here
IS_DEBUG=False

# Model Paths
DEFAULT_MODEL_PATH=./ml_model/models
AI_DETECTION_MODEL=desklib/ai-text-detector-v1.01
TEXT_GENERATION_MODEL=GoToCompany/gemma2-9b-cpt-sahabatai-v1-instruct

# External APIs
GEMINI_API_KEY=your-gemini-api-key-here
```

## 🔧 API Usage Examples

### AI Content Detection

```bash
curl -X POST "http://localhost:8000/api/v1/detect-ai" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR-API-KEY" \
  -d '{
    "text": "Artificial intelligence is transforming our world in unprecedented ways."
  }'
```

**Response:**
```json
{
  "probability": 0.8234,
  "label": 1,
  "prediction": "AI Generated",
  "model": "desklib/ai-text-detector-v1.01"
}
```

### Text Generation

```bash
curl -X POST "http://localhost:8000/api/v1/generate-text" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR-API-KEY" \
  -d '{
    "text": "Explain the benefits of renewable energy",
    "max_new_tokens": 200,
    "temperature": 0.7
  }'
```

### Chat Interface

```bash
curl -X POST "http://localhost:8000/api/v1/chat" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR-API-KEY" \
  -d '{
    "text": "What is machine learning?",
    "conversation_history": [],
    "max_new_tokens": 150
  }'
```

### Prompt Evaluation (Gemini)

```bash
curl -X POST "http://localhost:8000/api/v1/evaluate" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Write a comprehensive guide about machine learning for beginners"
  }'
```

**Response:**
```json
{
  "overall_score": 85.2,
  "clarity": 90,
  "specificity": 80,
  "ethics": 95,
  "effectiveness": 85,
  "bias_risk": 10,
  "strengths": ["Clear topic definition", "Educational purpose"],
  "weaknesses": ["Could specify target audience"],
  "suggestions": ["Add specific learning outcomes", "Include difficulty level"],
  "improved_prompt": "Enhanced version here...",
  "evaluation_details": {
    "word_count": 12,
    "character_count": 67,
    "model_used": "gemini-2.5-pro",
    "evaluation_method": "few_shot_learning"
  },
  "success": true
}
```

### Prompt Evaluation (Local Model)

```bash
curl -X POST "http://localhost:8000/api/v1/evaluate-goto" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR-API-KEY" \
  -d '{
    "prompt": "Jelaskan tentang kecerdasan buatan dalam bahasa Indonesia"
  }'
```

## 🧪 Testing

```bash
# Run all tests
make test

# Run tests without make
pip install tox pytest flake8 coverage bandit
tox

# Run specific test categories
pytest tests/test_api/
pytest tests/test_service/
```

## 🔐 Authentication

All API endpoints (except health checks) require authentication using an API key:

```bash
# In headers
Authorization: Bearer YOUR-API-KEY

# Or as token parameter
token: YOUR-API-KEY
```

## 📊 Models Used

| Service | Model | Purpose | Size |
|---------|-------|---------|------|
| AI Detection | `desklib/ai-text-detector-v1.01` | Detect AI-generated text | ~1.5GB |
| Text Generation | `GoToCompany/gemma2-9b-cpt-sahabatai-v1-instruct` | Indonesian-optimized text generation | ~9GB |
| Prompt Evaluation | `gemini-2.5-pro` | Advanced prompt analysis | API-based |

## 🌐 CORS Configuration

The API is configured to accept requests from:
- `http://localhost:5173` (Vite/React dev server)
- `http://127.0.0.1:5173`

Additional origins can be configured in `main.py`.

## 🐳 Docker Deployment

```bash
# Build and run with Docker
make deploy

# Or manually
docker build -t eira-backend .
docker run -p 8000:8000 --env-file .env eira-backend
```

## 🔍 Monitoring & Logging

The application uses structured logging with Loguru:

- **Health endpoint**: `/health/heartbeat`
- **Detailed status**: `/api/v1/health`
- **Logs**: Comprehensive request/response logging
- **Error tracking**: Detailed error messages and stack traces

## 📚 Additional Documentation

- **Text Generation API**: See `TEXT_GENERATION_API.md`
- **Prompt Evaluation API**: See `GOTO_PROMPT_EVALUATION_API.md`
- **Model Details**: See `ml_model/model_description.md`
- **Colab Deployment**: See `EIRA_deployment.ipynb` - Complete deployment notebook for Google Colab

## 📓 EIRA Deployment Notebook

The `EIRA_deployment.ipynb` is a comprehensive Jupyter notebook designed for deploying and testing the EIRA API in cloud environments, particularly Google Colab with T4 GPU support. This notebook provides:

### 🌟 Key Features:
- **One-Click Deployment**: Complete setup from git clone to running API
- **GPU Optimization**: Configured for T4 Colab GPUs with 8-bit quantization
- **Public Access**: Integrated ngrok tunneling for public API access
- **Environment Configuration**: Automated `.env` file creation with API keys
- **Model Testing**: Built-in prompt engineering and evaluation testing
- **Live API Server**: Runs FastAPI server directly in the notebook

### 🛠️ What It Does:
1. **Repository Setup**: Clones EIRA repository and installs dependencies
2. **Environment Configuration**: Creates `.env` file with necessary API keys and model paths
3. **Public Tunnel**: Establishes ngrok tunnel for external API access
4. **Model Loading**: Loads text generation models with GPU optimization
5. **API Server**: Starts FastAPI server accessible via public URL
6. **Testing Framework**: Includes prompt evaluation testing with local models
7. **Prompt Engineering**: Demonstrates advanced prompt engineering techniques

### 🚀 Usage:
Perfect for:
- **Research & Development**: Quick prototyping and testing
- **Demo Deployment**: Sharing API access for demonstrations
- **Model Experimentation**: Testing different AI models and configurations
- **Educational Purpose**: Learning prompt engineering and AI model deployment
- **Rapid Deployment**: Getting EIRA API running in minutes without local setup

### 📋 Prerequisites:
- Google Colab account (free tier works)
- Gemini API key for prompt evaluation
- ngrok authentication token for public access

The notebook is particularly useful for users who want to test EIRA's capabilities without setting up a local development environment or for educational purposes in AI/ML courses.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **[huggingfastapi](https://github.com/Proteusiq/huggingfastapi)** - Original boilerplate by Proteusiq
- **Hugging Face** - For providing excellent model hosting and transformers library
- **FastAPI** - For the amazing web framework
- **Google** - For Gemini API access
- **GoTo Company** - For the Indonesian-optimized Gemma2 model
