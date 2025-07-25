from typing import Callable

from fastapi import FastAPI
from loguru import logger

from huggingfastapi.core.config import DEFAULT_MODEL_PATH
from huggingfastapi.services.nlp import AIDetectionModel
from huggingfastapi.services.text_generation import TextGenerationModel


def _startup_ai_model(app: FastAPI) -> None:
    model_path = DEFAULT_MODEL_PATH
    ai_model_instance = AIDetectionModel(model_path)
    app.state.ai_model = ai_model_instance


def _startup_text_generation_model(app: FastAPI) -> None:
    logger.info("Initializing text generation model...")
    text_gen_model_instance = TextGenerationModel()
    app.state.text_gen_model = text_gen_model_instance
    logger.info("Text generation model initialized successfully.")


def _shutdown_model(app: FastAPI) -> None:
    app.state.ai_model = None
    app.state.text_gen_model = None


def start_app_handler(app: FastAPI) -> Callable:
    def startup() -> None:
        logger.info("Running app start handler.")
        _startup_ai_model(app)
        _startup_text_generation_model(app)
    return startup


def stop_app_handler(app: FastAPI) -> Callable:
    def shutdown() -> None:
        logger.info("Running app shutdown handler.")
        _shutdown_model(app)

    return shutdown
