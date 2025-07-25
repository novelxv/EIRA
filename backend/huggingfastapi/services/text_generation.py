from typing import Dict, List, Optional
from loguru import logger
import torch
import transformers
from transformers import BitsAndBytesConfig

from huggingfastapi.models.payload import TextGenerationPayload
from huggingfastapi.models.prediction import TextGenerationResult
from huggingfastapi.core.messages import NO_VALID_PAYLOAD
from huggingfastapi.core.config import TEXT_GENERATION_MODEL


class TextGenerationModel:
    def __init__(self, model_id: Optional[str] = None):
        self.model_id = model_id or TEXT_GENERATION_MODEL
        self.pipeline = None
        self.terminators = None
        self._load_model()

    def _load_model(self):
        """Load the model with 8-bit quantization"""
        logger.info(f"Loading text generation model: {self.model_id} with 8-bit quantization")
        
        try:
            # Configure 8-bit quantization
            quantization_config = BitsAndBytesConfig(
                load_in_8bit=True,
                llm_int8_threshold=6.0,
                llm_int8_has_fp16_weight=False,
            )
            
            # Create the pipeline with 8-bit quantization
            self.pipeline = transformers.pipeline(
                "text-generation",
                model=self.model_id,
                model_kwargs={
                    "torch_dtype": torch.bfloat16,
                    "quantization_config": quantization_config,
                },
                device_map="auto",
            )
            
            # Set up terminators
            self.terminators = [
                self.pipeline.tokenizer.eos_token_id,
                self.pipeline.tokenizer.convert_tokens_to_ids("<|eot_id|>")
            ]
            
            logger.info("Text generation model loaded successfully with 8-bit quantization")
            
        except Exception as e:
            logger.error(f"Failed to load text generation model: {str(e)}")
            raise

    def _pre_process(self, payload: TextGenerationPayload) -> List[Dict[str, str]]:
        """Prepare the input messages for text generation"""
        logger.debug("Pre-processing text generation payload.")
        
        messages = []
        
        # Add system message if provided
        if payload.system_message:
            messages.append({"role": "system", "content": payload.system_message})
        
        # Add user message
        messages.append({"role": "user", "content": payload.text})
        
        # Add conversation history if provided
        if payload.conversation_history:
            # Insert conversation history before the current user message
            messages = messages[:-1] + payload.conversation_history + [messages[-1]]
        
        return messages

    def _post_process(self, outputs: List[Dict], original_messages: List[Dict]) -> TextGenerationResult:
        """Process the model output and return structured result"""
        logger.debug("Post-processing text generation prediction.")
        
        try:
            # Get the generated text from the last message
            generated_conversation = outputs[0]["generated_text"]
            
            # Extract only the assistant's response (the last message in the conversation)
            assistant_response = generated_conversation[-1]["content"]
            
            # Create result object
            result = TextGenerationResult(
                generated_text=assistant_response,
                full_conversation=generated_conversation,
                model=self.model_id,
                input_length=len(str(original_messages)),
                output_length=len(assistant_response)
            )
            
            return result
            
        except Exception as e:
            logger.error(f"Error in post-processing: {str(e)}")
            # Fallback to raw output if structured extraction fails
            raw_output = str(outputs[0]["generated_text"])
            return TextGenerationResult(
                generated_text=raw_output,
                full_conversation=outputs[0]["generated_text"],
                model=self.model_id,
                input_length=len(str(original_messages)),
                output_length=len(raw_output)
            )

    def _generate(self, messages: List[Dict[str, str]], max_new_tokens: int = 256, temperature: float = 0.7) -> List[Dict]:
        """Generate text using the loaded model"""
        logger.debug("Generating text with model.")
        
        try:
            outputs = self.pipeline(
                messages,
                max_new_tokens=max_new_tokens,
                eos_token_id=self.terminators,
                temperature=temperature,
                do_sample=True,
                pad_token_id=self.pipeline.tokenizer.eos_token_id,
            )
            
            return outputs
            
        except Exception as e:
            logger.error(f"Error during text generation: {str(e)}")
            raise

    def generate(self, payload: TextGenerationPayload) -> TextGenerationResult:
        """Main method to generate text based on payload"""
        if payload is None:
            raise ValueError(NO_VALID_PAYLOAD.format(payload))

        # Pre-process the input
        messages = self._pre_process(payload)
        
        # Generate text
        outputs = self._generate(
            messages, 
            max_new_tokens=payload.max_new_tokens,
            temperature=payload.temperature
        )
        
        # Post-process and return result
        result = self._post_process(outputs, messages)
        
        logger.info(f"Text generation completed. Output length: {result.output_length}")
        return result
