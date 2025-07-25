from fastapi import APIRouter

from huggingfastapi.api.routes import heartbeat, prediction, text_generation

api_router = APIRouter()
api_router.include_router(heartbeat.router, tags=["health"], prefix="/health")
api_router.include_router(prediction.router, tags=["prediction"], prefix="/v1")
api_router.include_router(text_generation.router, tags=["text-generation"], prefix="/v1")
