from starlette.config import Config
from starlette.datastructures import Secret

APP_VERSION = "0.1.0"
APP_NAME = "Hugging FastAPI"
API_PREFIX = "/api"

config = Config(".env")

API_KEY: Secret = config("API_KEY", cast=Secret)
IS_DEBUG: bool = config("IS_DEBUG", cast=bool, default=False)

DEFAULT_MODEL_PATH: str = config("DEFAULT_MODEL_PATH")
AI_DETECTION_MODEL : str =  config("AI_DETECTION_MODEL")

# Text generation model configuration
TEXT_GENERATION_MODEL: str = config("TEXT_GENERATION_MODEL", default="GoToCompany/gemma2-9b-cpt-sahabatai-v1-instruct")
GEMINI_API_KEY : str = config("GEMINI_API_KEY")
