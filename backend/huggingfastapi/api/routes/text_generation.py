from fastapi import APIRouter, Depends, HTTPException
from starlette.requests import Request
from loguru import logger

from huggingfastapi.core import security
from huggingfastapi.models.payload import TextGenerationPayload
from huggingfastapi.models.prediction import TextGenerationResult
from huggingfastapi.services.text_generation import TextGenerationModel

router = APIRouter()


@router.post("/generate-text", response_model=TextGenerationResult, name="generate-text")
def post_generate_text(
    request: Request,
    authenticated: bool = Depends(security.validate_request),
    payload: TextGenerationPayload = None,
) -> TextGenerationResult:
    """
    #### Generate text using Gemma2-9B model with 8-bit quantization
    
    Uses the GoToCompany/gemma2-9b-cpt-sahabatai-v1-instruct model to generate text responses.
    The model is loaded with 8-bit quantization for memory efficiency.
    
    Parameters:
    - text: The user message/prompt for text generation
    - system_message: Optional system message to set context
    - conversation_history: Optional list of previous messages in the conversation
    - max_new_tokens: Maximum number of new tokens to generate (default: 256)
    - temperature: Temperature for sampling (default: 0.7)
    
    Returns:
    - generated_text: The AI-generated response
    - full_conversation: Complete conversation including input and output
    - model: Name of the model used
    - input_length: Length of the input
    - output_length: Length of the generated output
    """
    
    try:
        text_gen_model: TextGenerationModel = request.app.state.text_gen_model
        result: TextGenerationResult = text_gen_model.generate(payload)
        return result
        
    except Exception as e:
        logger.error(f"Error in text generation endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Text generation failed: {str(e)}")


@router.post("/chat", response_model=TextGenerationResult, name="chat")
def post_chat(
    request: Request,
    authenticated: bool = Depends(security.validate_request),
    payload: TextGenerationPayload = None,
) -> TextGenerationResult:
    """
    #### Chat endpoint using Gemma2-9B model
    
    Simplified chat interface for conversational text generation.
    Automatically sets a conversational system message.
    
    Parameters:
    - text: The user message
    - conversation_history: Optional list of previous messages
    - max_new_tokens: Maximum number of new tokens to generate (default: 256)
    - temperature: Temperature for sampling (default: 0.7)
    
    Returns:
    - generated_text: The AI-generated response
    - full_conversation: Complete conversation including input and output
    - model: Name of the model used
    - input_length: Length of the input
    - output_length: Length of the generated output
    """
    
    try:
        # Set a default system message for chat if none provided
        if not payload.system_message:
            payload.system_message = "Anda adalah asisten AI yang membantu dan ramah. Jawablah pertanyaan dengan jelas dan informatif."
        
        text_gen_model: TextGenerationModel = request.app.state.text_gen_model
        result: TextGenerationResult = text_gen_model.generate(payload)
        return result
        
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Chat failed: {str(e)}")
