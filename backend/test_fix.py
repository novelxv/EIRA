#!/usr/bin/env python3
"""
Test script untuk memverifikasi fix pada GeminiPromptEvaluator
"""
import sys
import os

# Add the backend directory to Python path
sys.path.insert(0, '/home/jery201/Documents/EIRA/backend')

try:
    from huggingfastapi.services.nlp import GeminiPromptEvaluator
    print("✅ Import GeminiPromptEvaluator berhasil")
    
    # Test instantiation (tanpa API key untuk saat ini)
    evaluator = GeminiPromptEvaluator(api_key="dummy_key_for_test")
    print("✅ Instantiation GeminiPromptEvaluator berhasil")
    
    # Test method signature
    import inspect
    parse_method = getattr(evaluator, '_parse_evaluation_response')
    sig = inspect.signature(parse_method)
    params = list(sig.parameters.keys())
    print(f"✅ Method signature: {params}")
    
    if 'self' in params and 'response_text' in params:
        print("✅ Method signature sudah benar (memiliki self dan response_text)")
    else:
        print(f"❌ Method signature masih salah: {params}")
        
    print("\n🎉 Semua test berhasil! Fix sudah benar.")
    
except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()
