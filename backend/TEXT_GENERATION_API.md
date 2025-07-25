# Text Generation API Documentation

## Overview

The text generation API provides endpoints for generating text using the Gemma2-9B model (`GoToCompany/gemma2-9b-cpt-sahabatai-v1-instruct`) with 8-bit quantization for memory efficiency.

## Features

- **8-bit Quantization**: Memory-efficient loading using BitsAndBytesConfig
- **Conversation Support**: Handles multi-turn conversations with history
- **System Messages**: Support for custom system prompts
- **Temperature Control**: Adjustable randomness in generation
- **Token Limiting**: Control output length with max_new_tokens

## Endpoints

### 1. POST `/api/v1/generate-text`

General purpose text generation endpoint.

#### Request Body

```json
{
  "text": "Your prompt here",
  "system_message": "Optional system message",
  "conversation_history": [
    {"role": "user", "content": "Previous user message"},
    {"role": "assistant", "content": "Previous assistant response"}
  ],
  "max_new_tokens": 256,
  "temperature": 0.7
}
```

#### Response

```json
{
  "generated_text": "AI-generated response",
  "full_conversation": [
    {"role": "system", "content": "System message"},
    {"role": "user", "content": "User message"},
    {"role": "assistant", "content": "AI response"}
  ],
  "model": "GoToCompany/gemma2-9b-cpt-sahabatai-v1-instruct",
  "input_length": 50,
  "output_length": 120
}
```

### 2. POST `/api/v1/chat`

Simplified chat interface with automatic conversational system message.

#### Request Body

```json
{
  "text": "Your message here",
  "conversation_history": [
    {"role": "user", "content": "Hi there!"},
    {"role": "assistant", "content": "Hello! How can I help you?"}
  ],
  "max_new_tokens": 256,
  "temperature": 0.7
}
```

#### Response

Same as `/generate-text` endpoint.

## Usage Examples

### Example 1: Simple Text Generation

```bash
curl -X POST "http://localhost:8000/api/v1/generate-text" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "text": "Sopo wae sing ana ing Punakawan?",
    "max_new_tokens": 256,
    "temperature": 0.7
  }'
```

### Example 2: Chat with System Message

```bash
curl -X POST "http://localhost:8000/api/v1/chat" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "text": "Ceritakne babagan sejarah Jawa",
    "max_new_tokens": 512,
    "temperature": 0.8
  }'
```

### Example 3: Conversation with History

```bash
curl -X POST "http://localhost:8000/api/v1/generate-text" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "text": "Jelasne luwih rinci",
    "conversation_history": [
      {"role": "user", "content": "Apa iku Punakawan?"},
      {"role": "assistant", "content": "Punakawan minangka karakter ing wayang..."}
    ],
    "max_new_tokens": 300,
    "temperature": 0.7
  }'
```

## Parameters

### Required Parameters

- **text** (string): The user message or prompt for text generation

### Optional Parameters

- **system_message** (string): System message to set context for the conversation
- **conversation_history** (array): List of previous messages in the conversation
  - Each message should have "role" (user/assistant/system) and "content" fields
- **max_new_tokens** (integer): Maximum number of new tokens to generate (default: 256)
- **temperature** (float): Temperature for sampling, controls randomness (default: 0.7)
  - Lower values (0.1-0.3): More deterministic, focused responses
  - Higher values (0.8-1.0): More creative, diverse responses

## Model Information

- **Model**: GoToCompany/gemma2-9b-cpt-sahabatai-v1-instruct
- **Quantization**: 8-bit using BitsAndBytesConfig
- **Terminators**: EOS token and `<|eot_id|>` token
- **Device**: Auto-distributed across available GPUs

## Error Handling

The API returns appropriate HTTP status codes:

- **200**: Success
- **400**: Invalid request format
- **401**: Authentication failed
- **500**: Server error (model loading failure, generation error, etc.)

## Memory Requirements

With 8-bit quantization, the Gemma2-9B model requires approximately:
- **RAM**: 10-12 GB
- **VRAM**: 6-8 GB (depending on sequence length)

## Performance Tips

1. **Batch Processing**: For multiple requests, consider batching
2. **Token Limits**: Use appropriate `max_new_tokens` to control latency
3. **Temperature**: Lower temperature for faster, more deterministic responses
4. **Memory**: Monitor GPU memory usage during concurrent requests

## Installation

Make sure you have the required dependencies:

```bash
pip install bitsandbytes==0.44.1 accelerate==1.2.1
```

## Testing

Use the provided test script to verify the setup:

```bash
cd backend
python test_text_generation.py
```
