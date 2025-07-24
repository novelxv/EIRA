import pytest

from huggingfastapi.core import config
from huggingfastapi.models.payload import QAPredictionPayload
from huggingfastapi.models.prediction import QAPredictionResult
from huggingfastapi.services.nlp import QAModel


def test_prediction(test_client) -> None:
    model_path = config.DEFAULT_MODEL_PATH
    qa = QAPredictionPayload.parse_obj(
        {"context": "two plus two equal four", "question": "What is four?"}
    )

    tm = QAModel(model_path)
    result = tm.predict(qa)
    assert isinstance(result, QAPredictionResult)
    assert result.answer == "two plus two"


def test_prediction_no_payload(test_client) -> None:
    model_path = config.DEFAULT_MODEL_PATH

    tm = QAModel(model_path)
    with pytest.raises(ValueError):
        result = tm.predict(None)
        assert isinstance(result, QAPredictionResult)
