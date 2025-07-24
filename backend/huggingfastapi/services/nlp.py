from typing import Dict, List
from loguru import logger
import torch
import torch.nn as nn

from transformers import AutoTokenizer
from transformers import AutoModelForQuestionAnswering, AutoConfig, AutoModel, PreTrainedModel
from transformers import pipeline

from huggingfastapi.models.payload import AIDetectionPayload
from huggingfastapi.models.prediction import AIDetectionResult
from huggingfastapi.services.utils import ModelLoader
from huggingfastapi.core.messages import NO_VALID_PAYLOAD
from huggingfastapi.core.config import (
    DEFAULT_MODEL_PATH,
    AI_DETECTION_MODEL,
)

class DesklibAIDetectionModel(PreTrainedModel):
    config_class = AutoConfig

    def __init__(self, config):
        super().__init__(config)
        # Initialize the base transformer model.
        self.model = AutoModel.from_config(config)
        # Define a classifier head.
        self.classifier = nn.Linear(config.hidden_size, 1)
        # Initialize weights (handled by PreTrainedModel)
        self.init_weights()

    def forward(self, input_ids, attention_mask=None, labels=None):
        # Forward pass through the transformer
        outputs = self.model(input_ids, attention_mask=attention_mask)
        last_hidden_state = outputs[0]
        # Mean pooling
        input_mask_expanded = attention_mask.unsqueeze(-1).expand(last_hidden_state.size()).float()
        sum_embeddings = torch.sum(last_hidden_state * input_mask_expanded, dim=1)
        sum_mask = torch.clamp(input_mask_expanded.sum(dim=1), min=1e-9)
        pooled_output = sum_embeddings / sum_mask

        # Classifier
        logits = self.classifier(pooled_output)
        loss = None
        if labels is not None:
            loss_fct = nn.BCEWithLogitsLoss()
            loss = loss_fct(logits.view(-1), labels.float())

        output = {"logits": logits}
        if loss is not None:
            output["loss"] = loss
        return output


class AIDetectionModel(object):
    def __init__(self, path=DEFAULT_MODEL_PATH):
        self.path = path
        self.model_name = AI_DETECTION_MODEL
        self.max_len = 768
        self.threshold = 0.5
        self._load_local_model()

    def _load_local_model(self):
        logger.info(f"Loading AI detection model: {self.model_name}")
        
        # Use ModelLoader to handle local storage and loading
        tokenizer, model = ModelLoader(
            model_name=self.model_name,
            model_directory=self.path,
            tokenizer_loader=AutoTokenizer,
            model_loader=DesklibAIDetectionModel,
        ).retrieve()
        
        self.tokenizer = tokenizer
        self.model = model
        
        # Device is already handled by ModelLoader
        self.device = next(model.parameters()).device
        
        logger.info(f"AI detection model loaded on device: {self.device}")

    def _pre_process(self, payload: AIDetectionPayload) -> str:
        logger.debug("Pre-processing AI detection payload.")
        return payload.text

    def _post_process(self, probability: float, label: int) -> AIDetectionResult:
        logger.debug("Post-processing AI detection prediction.")
        
        prediction_text = "AI Generated" if label == 1 else "Human Generated"
        
        ai_result = AIDetectionResult(
            probability=probability,
            label=label,
            prediction=prediction_text
        )
        
        return ai_result

    def _predict(self, text: str) -> tuple:
        logger.debug("Predicting AI detection.")
        
        encoded = self.tokenizer(
            text,
            padding='max_length',
            truncation=True,
            max_length=self.max_len,
            return_tensors='pt'
        )
        input_ids = encoded['input_ids'].to(self.device)
        attention_mask = encoded['attention_mask'].to(self.device)

        self.model.eval()
        with torch.no_grad():
            outputs = self.model(input_ids=input_ids, attention_mask=attention_mask)
            logits = outputs["logits"]
            probability = torch.sigmoid(logits).item()

        label = 1 if probability >= self.threshold else 0
        return probability, label

    def predict(self, payload: AIDetectionPayload):
        if payload is None:
            raise ValueError(NO_VALID_PAYLOAD.format(payload))

        pre_processed_text = self._pre_process(payload)
        probability, label = self._predict(pre_processed_text)
        logger.info(f"AI Detection - Probability: {probability:.4f}, Label: {label}")
        post_processed_result = self._post_process(probability, label)

        return post_processed_result
