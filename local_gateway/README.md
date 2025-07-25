# EIRA Local Gateway API Documentation

## Overview

The EIRA Local Gateway acts as a proxy server between your frontend application and the backend API. It provides local endpoints that forward requests to the backend server, making it easy to develop and test your frontend locally.

## Setup

### 1. Install Dependencies

```bash
pip install flask flask-cors requests
```

### 2. Configure Backend URL

Edit the configuration in `app.py`:

```python
BASE_TARGET_API_URL = "https://your-backend-url.ngrok-free.app"
API_TOKEN = "your-api-token"
```

### 3. Run the Gateway

```bash
cd local_gateway
python app.py
```

The gateway will start on `http://localhost:5000`

## Available Endpoints

### 🏥 Health Endpoints

#### 1. Basic Heartbeat
```
GET /health/heartbeat
```

**Response:**
```json
{
  "is_alive": true
}
```

#### 2. Full Health Status
```
GET /api/v1/health
```

**Response:**
```json
{
  "status": "healthy",
  "service": "EIRA Prompt Evaluator API", 
  "version": "2.0.0",
  "model": "gemini-2.5-pro",
  "gemini_connected": true,
  "timestamp": "2025-07-25T10:30:00.000Z",
  "success": true,
  "endpoints": {
    "evaluate": "POST /evaluate",
    "health": "GET /health"
  }
}
```

### 🤖 AI Detection

#### Detect AI-Generated Text
```
POST /api/v1/detect-ai
```

**Request Body:**
```json
{
  "text": "Text to analyze for AI detection"
}
```

**Response:**
```json
{
  "probability": 0.85,
  "label": 1,
  "prediction": "AI Generated",
  "model": "desklib/ai-text-detector-v1.01"
}
```

### ✨ Text Generation

#### 1. Generate Text
```
POST /api/v1/generate-text
```

**Request Body:**
```json
{
  "text": "Your prompt for text generation",
  "system_message": "Optional system message",
  "conversation_history": [
    {"role": "user", "content": "Previous message"},
    {"role": "assistant", "content": "Previous response"}
  ],
  "max_new_tokens": 256,
  "temperature": 0.7
}
```

**Response:**
```json
{
  "generated_text": "AI-generated response",
  "full_conversation": [
    {"role": "user", "content": "Your prompt"},
    {"role": "assistant", "content": "AI response"}
  ],
  "model": "GoToCompany/gemma2-9b-cpt-sahabatai-v1-instruct",
  "input_length": 25,
  "output_length": 150
}
```

#### 2. Chat Interface
```
POST /api/v1/chat
```

**Request Body:**
```json
{
  "text": "Your message",
  "conversation_history": [
    {"role": "user", "content": "Hi there!"},
    {"role": "assistant", "content": "Hello! How can I help you?"}
  ],
  "max_new_tokens": 256,
  "temperature": 0.7
}
```

**Response:** Same as generate-text endpoint

### 📝 Prompt Evaluation

#### 1. Evaluate with Gemini
```
POST /api/v1/evaluate
```

**Request Body:**
```json
{
  "prompt": "Your AI prompt to evaluate"
}
```

**Response:**
```json
{
  "overall_score": 85.2,
  "clarity": 90,
  "specificity": 85, 
  "ethics": 95,
  "effectiveness": 80,
  "bias_risk": 15,
  "strengths": ["Clear instructions", "Good context"],
  "weaknesses": ["Could be more specific"],
  "suggestions": ["Add output format requirements"],
  "improved_prompt": "Enhanced version of your prompt",
  "evaluation_details": {
    "model_used": "gemini-2.5-pro",
    "evaluation_method": "few_shot_learning"
  },
  "sources_used": ["OpenAI Best Practices", "Google AI Principles"],
  "timestamp": "2025-07-25T10:30:00.000Z",
  "success": true
}
```

#### 2. Evaluate with GoTo (Indonesian)
```
POST /api/v1/evaluate-goto
```

**Request Body:**
```json
{
  "prompt": "Prompt AI Anda untuk dievaluasi"
}
```

**Response:** Same structure as Gemini evaluation, but optimized for Indonesian language and culture.

### 📚 Documentation

#### List All Endpoints
```
GET /api/v1/endpoints
```

**Response:**
```json
{
  "message": "EIRA Local Gateway API",
  "version": "1.0.0", 
  "backend_url": "https://your-backend-url.ngrok-free.app",
  "endpoints": {
    "health": {...},
    "ai_detection": {...},
    "text_generation": {...},
    "prompt_evaluation": {...}
  }
}
```

## Usage Examples

### Frontend Integration (JavaScript/React)

#### 1. AI Detection
```javascript
const detectAI = async (text) => {
  const response = await fetch('http://localhost:5000/api/v1/detect-ai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text })
  });
  
  return await response.json();
};
```

#### 2. Text Generation
```javascript
const generateText = async (prompt, options = {}) => {
  const response = await fetch('http://localhost:5000/api/v1/generate-text', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: prompt,
      max_new_tokens: 256,
      temperature: 0.7,
      ...options
    })
  });
  
  return await response.json();
};
```

#### 3. Prompt Evaluation
```javascript
const evaluatePrompt = async (prompt, useGoTo = false) => {
  const endpoint = useGoTo ? '/api/v1/evaluate-goto' : '/api/v1/evaluate';
  
  const response = await fetch(`http://localhost:5000${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt })
  });
  
  return await response.json();
};
```

#### 4. Chat Interface
```javascript
const sendChatMessage = async (message, conversationHistory = []) => {
  const response = await fetch('http://localhost:5000/api/v1/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: message,
      conversation_history: conversationHistory
    })
  });
  
  return await response.json();
};
```

### cURL Examples

#### Health Check
```bash
curl -X GET "http://localhost:5000/health/heartbeat"
```

#### AI Detection
```bash
curl -X POST "http://localhost:5000/api/v1/detect-ai" \
  -H "Content-Type: application/json" \
  -d '{"text": "This text was generated by an AI model to demonstrate the detection capabilities."}'
```

#### Text Generation
```bash
curl -X POST "http://localhost:5000/api/v1/generate-text" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Jelaskan tentang kecerdasan buatan dalam bahasa Indonesia",
    "max_new_tokens": 200,
    "temperature": 0.8
  }'
```

#### Prompt Evaluation (Gemini)
```bash
curl -X POST "http://localhost:5000/api/v1/evaluate" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Write a comprehensive guide about machine learning for beginners"}'
```

#### Prompt Evaluation (GoTo - Indonesian)
```bash
curl -X POST "http://localhost:5000/api/v1/evaluate-goto" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Buatlah panduan lengkap tentang machine learning untuk pemula"}'
```

## Error Handling

### Common Error Responses

#### 400 - Bad Request
```json
{
  "error": "Field 'text' tidak ditemukan di body request"
}
```

#### 404 - Not Found
```json
{
  "error": "Endpoint not found",
  "message": "The requested endpoint does not exist",
  "available_endpoints": "/api/v1/endpoints"
}
```

#### 502 - Bad Gateway
```json
{
  "error": "Gagal mem-parsing respons dari API tujuan",
  "status_code": 500,
  "content": "Raw response content"
}
```

#### 504 - Gateway Timeout
```json
{
  "error": "Gagal menghubungi API tujuan",
  "details": "Connection timeout after 300 seconds"
}
```

## Configuration

### Environment Variables

You can set these environment variables instead of hardcoding values:

```bash
export BACKEND_URL="https://your-backend-url.ngrok-free.app"
export API_TOKEN="your-api-token"
export GATEWAY_PORT="5000"
export DEBUG_MODE="true"
```

### CORS Configuration

The gateway is configured to allow all origins for development. For production, update the CORS settings:

```python
CORS(app, origins=["https://your-frontend-domain.com"])
```

## Monitoring and Logging

The gateway includes basic logging for debugging:

- Request/response logging
- Error tracking
- API call monitoring

To view logs, run the gateway and check the console output.

## Development Tips

1. **Hot Reload**: The Flask server runs in debug mode for automatic reloading
2. **Error Details**: Detailed error messages help with debugging
3. **Endpoint Discovery**: Use `/api/v1/endpoints` to see all available routes
4. **Health Monitoring**: Use health endpoints to monitor backend connectivity

## Production Considerations

1. **Security**: Add proper authentication and rate limiting
2. **CORS**: Restrict origins to your frontend domain
3. **Logging**: Implement proper logging and monitoring
4. **Error Handling**: Add more robust error handling
5. **Load Balancing**: Consider load balancing for multiple backend instances
6. **HTTPS**: Use HTTPS in production environments

## Troubleshooting

### Common Issues

1. **Connection Refused**: Check if the backend server is running
2. **CORS Errors**: Verify CORS configuration matches your frontend URL
3. **Timeout Errors**: Increase timeout values for slow responses
4. **JSON Parse Errors**: Check response format from backend

### Debug Mode

Enable debug mode for detailed error information:

```python
app.run(debug=True, port=5000)
```
