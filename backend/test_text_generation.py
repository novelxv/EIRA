#!/usr/bin/env python3
"""
Test script for text generation with 8-bit quantization
Run this script to test the text generation model before starting the full API
"""

import sys
import os

# Add the backend directory to the Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from huggingfastapi.services.text_generation import TextGenerationModel
from huggingfastapi.models.payload import TextGenerationPayload
from loguru import logger

def test_text_generation():
    """Test the text generation model with a simple Javanese question"""
    
    logger.info("Starting text generation test...")
    
    try:
        # Initialize the model
        logger.info("Initializing text generation model...")
        model = TextGenerationModel()
        
        # Create a test payload
        test_payload = TextGenerationPayload(
            text="Sopo wae sing ana ing Punakawan?",
            max_new_tokens=256,
            temperature=0.7
        )
        
        logger.info("Generating text...")
        result = model.generate(test_payload)
        
        # Print results
        print("\n" + "="*50)
        print("TEXT GENERATION TEST RESULTS")
        print("="*50)
        print(f"Model: {result.model}")
        print(f"Input length: {result.input_length}")
        print(f"Output length: {result.output_length}")
        print("\nGenerated text:")
        print("-" * 30)
        print(result.generated_text)
        print("-" * 30)
        
        logger.info("Text generation test completed successfully!")
        return True
        
    except Exception as e:
        logger.error(f"Text generation test failed: {str(e)}")
        return False

if __name__ == "__main__":
    success = test_text_generation()
    if success:
        print("\n✅ Text generation test passed!")
        sys.exit(0)
    else:
        print("\n❌ Text generation test failed!")
        sys.exit(1)
