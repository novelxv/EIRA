from fastapi import APIRouter, Depends, HTTPException
from starlette.requests import Request
from loguru import logger

from huggingfastapi.core import security
from huggingfastapi.models.payload import TextGenerationPayload, PromptEvaluationPayload
from huggingfastapi.models.prediction import TextGenerationResult, EvaluationResult
from huggingfastapi.services.text_generation import TextGenerationModel
from huggingfastapi.services.nlp import GeminiPromptEvaluator

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


# Global evaluator instance
evaluator = None

def get_evaluator():
    """Get or create evaluator instance"""
    global evaluator
    if evaluator is None:
        evaluator = GeminiPromptEvaluator()
    return evaluator


@router.post("/evaluate", response_model=EvaluationResult, name="evaluate-prompt")
def post_evaluate_prompt(
    request: Request,
    authenticated: bool = Depends(security.validate_request),
    payload: PromptEvaluationPayload = None,
) -> EvaluationResult:
    """
    #### Evaluate AI prompts using Gemini 2.5 Pro with advanced criteria
    
    Analyzes prompts based on research-backed evaluation criteria from leading AI organizations.
    Uses few-shot learning and expert knowledge for consistent, accurate assessments.
    
    Evaluation Criteria:
    - Clarity (25%): Language simplicity, clear instructions, logical structure
    - Specificity (30%): Detailed context, output format, constraints, role definition
    - Ethics (20%): Bias-free content, inclusive language, AI safety alignment
    - Effectiveness (25%): Clear goals, appropriate structure, context provision
    - Bias Risk (penalty): Detection of stereotypes, assumptions, prejudices
    
    Parameters:
    - prompt: The prompt text to evaluate (max 3000 characters)
    
    Returns:
    - overall_score: Weighted score based on all criteria (0-100)
    - Individual scores for each criterion
    - strengths: List of identified strengths
    - weaknesses: List of areas for improvement
    - suggestions: Actionable improvement recommendations
    - improved_prompt: Enhanced version demonstrating best practices
    - evaluation_details: Technical details about the evaluation
    - sources_used: Research sources referenced
    - timestamp: When the evaluation was performed
    """
    
    try:
        if not payload or not payload.prompt:
            raise HTTPException(status_code=400, detail="Prompt is required")

        prompt = payload.prompt.strip()
        if not prompt:
            raise HTTPException(status_code=400, detail="Prompt cannot be empty")

        if len(prompt) > 3000:
            raise HTTPException(status_code=400, detail="Prompt too long (max 3000 characters)")

        # Get evaluator instance
        eval_instance = get_evaluator()
        
        # Run evaluation
        logger.info(f"API Request: {prompt[:50]}...")
        result: EvaluationResult = eval_instance.evaluate_prompt(prompt)
        
        response = result.to_dict()


        response['success'] = True

        logger.info(f"API Response: Score {response['overall_score']}")
        
        return response
        
    except HTTPException:
        raise
    except ValueError as e:
        logger.error(f"Validation error in evaluation endpoint: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error in evaluation endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Evaluation failed: {str(e)}")
