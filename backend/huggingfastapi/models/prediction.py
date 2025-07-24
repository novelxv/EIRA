from pydantic import BaseModel
from huggingfastapi.core.config import AI_DETECTION_MODEL


class AIDetectionResult(BaseModel):
    
    probability: float
    label: int
    prediction: str
    model: str = AI_DETECTION_MODEL
