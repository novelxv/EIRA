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
    
class EvaluationResult(BaseModel):
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

    # def to_dict(self) -> Dict:
    #     """Convert to dictionary for JSON serialization"""
    #     return asdict(self)
