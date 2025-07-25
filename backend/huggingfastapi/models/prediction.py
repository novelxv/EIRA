from pydantic import BaseModel
from typing import List, Dict, Any
from huggingfastapi.core.config import AI_DETECTION_MODEL


class AIDetectionResult(BaseModel):
    
    probability: float
    label: int
    prediction: str
    model: str = AI_DETECTION_MODEL


class TextGenerationResult(BaseModel):
    generated_text: str
    full_conversation: List[Dict[str, str]]
    model: str
    input_length: int
    output_length: int
