#!/usr/bin/env python3
"""
Test script for GoTo prompt evaluation
Run this script to test the GoTo prompt evaluator implementation
"""

import sys
import os

# Add the backend directory to the Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from huggingfastapi.services.nlp import GoToPromptEvaluator
from huggingfastapi.services.text_generation import TextGenerationModel
from loguru import logger

def test_goto_prompt_evaluation():
    """Test the GoTo prompt evaluator"""
    
    logger.info("Starting GoTo prompt evaluation test...")
    
    try:
        # Initialize the text generation model
        logger.info("Initializing text generation model...")
        text_gen_model = TextGenerationModel()
        
        # Initialize GoTo evaluator
        logger.info("Initializing GoTo prompt evaluator...")
        evaluator = GoToPromptEvaluator(text_gen_model)
        
        # Test prompt
        test_prompt = "Write a comprehensive guide about machine learning for beginners, including key concepts, practical examples, and learning resources."
        
        logger.info(f"Evaluating test prompt: {test_prompt[:50]}...")
        result = evaluator.evaluate_prompt(test_prompt)
        
        # Print results
        print("\n" + "="*50)
        print("GOTO PROMPT EVALUATION TEST RESULTS")
        print("="*50)
        print(f"Overall Score: {result.overall_score}")
        print(f"Clarity: {result.clarity}")
        print(f"Specificity: {result.specificity}")
        print(f"Ethics: {result.ethics}")
        print(f"Effectiveness: {result.effectiveness}")
        print(f"Bias Risk: {result.bias_risk}")
        print("\nStrengths:")
        for i, strength in enumerate(result.strengths, 1):
            print(f"  {i}. {strength}")
        print("\nWeaknesses:")
        for i, weakness in enumerate(result.weaknesses, 1):
            print(f"  {i}. {weakness}")
        print("\nSuggestions:")
        for i, suggestion in enumerate(result.suggestions, 1):
            print(f"  {i}. {suggestion}")
        print(f"\nImproved Prompt:\n{result.improved_prompt}")
        print("-" * 50)
        
        logger.info("GoTo prompt evaluation test completed successfully!")
        return True
        
    except Exception as e:
        logger.error(f"GoTo prompt evaluation test failed: {str(e)}")
        return False

if __name__ == "__main__":
    success = test_goto_prompt_evaluation()
    if success:
        print("\n✅ GoTo prompt evaluation test passed!")
        sys.exit(0)
    else:
        print("\n❌ GoTo prompt evaluation test failed!")
        sys.exit(1)
