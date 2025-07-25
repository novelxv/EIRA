from fastapi import APIRouter, Depends, HTTPException
from typing import Dict
from starlette.requests import Request
from loguru import logger
from datetime import datetime

from huggingfastapi.core import security
from huggingfastapi.models.payload import PromptEvaluationPayload
from huggingfastapi.models.prediction import EvaluationResult, EvaluationResponse
from huggingfastapi.services.nlp import GeminiPromptEvaluator


router = APIRouter()
# Global evaluator instance
evaluator = None

def get_evaluator():
    """Get or create evaluator instance"""
    global evaluator
    if evaluator is None:
        evaluator = GeminiPromptEvaluator()
    return evaluator


# Ganti `EvaluationResult` menjadi `EvaluationResponse` di sini
@router.post("/evaluate", response_model=EvaluationResponse, name="evaluate-prompt")
def post_evaluate_prompt(
    request: Request,
    payload: PromptEvaluationPayload = None,
) -> EvaluationResponse:
    """
    #### Evaluate AI prompts using Gemini 2.5 Pro with advanced criteria
    
    ... (Docstring Anda tidak perlu diubah) ...
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
        
        # Ubah Pydantic model menjadi dict
        response_data = result.model_dump()

        # Tambahkan field 'success'
        response_data['success'] = True

        logger.info(f"API Response: The Score {response_data['overall_score']}")

        # Kembalikan dictionary. FastAPI akan memvalidasinya dengan `EvaluationResponse`
        return response_data
        
    except HTTPException:
        raise
    except ValueError as e:
        logger.error(f"Validation error in evaluation endpoint: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error in evaluation endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Evaluation failed: {str(e)}")



@router.get('/health', name="health-check")
def health_check():
    """
    #### Health check endpoint
    Memeriksa status layanan dan konektivitas ke model Gemini.
    """
    eval_instance = get_evaluator()
    
    # Di FastAPI, cukup kembalikan dictionary.
    # FastAPI akan otomatis mengubahnya menjadi respons JSON.
    return {
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
    }