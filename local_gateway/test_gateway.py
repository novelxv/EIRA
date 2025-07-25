#!/usr/bin/env python3
"""
Test script for EIRA Local Gateway
Tests all available endpoints to ensure they're working correctly
"""

import requests
import json
import time

GATEWAY_URL = "http://localhost:5000"

def test_endpoint(method, endpoint, data=None, description=""):
    """Test a single endpoint"""
    print(f"\n🧪 Testing: {description}")
    print(f"   {method} {endpoint}")
    
    try:
        url = GATEWAY_URL + endpoint
        
        if method == "GET":
            response = requests.get(url, timeout=10)
        else:  # POST
            response = requests.post(url, json=data, timeout=30)
        
        print(f"   ✅ Status: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            if 'success' in result:
                print(f"   ✅ Success: {result['success']}")
            if 'overall_score' in result:
                print(f"   📊 Score: {result['overall_score']}")
            if 'is_alive' in result:
                print(f"   💓 Alive: {result['is_alive']}")
            if 'generated_text' in result:
                print(f"   📝 Generated: {result['generated_text'][:50]}...")
            if 'prediction' in result:
                print(f"   🤖 Prediction: {result['prediction']}")
        else:
            print(f"   ❌ Error: {response.text[:100]}")
            
        return response.status_code == 200
        
    except requests.exceptions.RequestException as e:
        print(f"   ❌ Connection Error: {e}")
        return False
    except Exception as e:
        print(f"   ❌ Error: {e}")
        return False

def main():
    """Run all endpoint tests"""
    print("🚀 EIRA Local Gateway - Endpoint Test Suite")
    print("=" * 50)
    
    # Check if gateway is running
    try:
        response = requests.get(GATEWAY_URL, timeout=5)
        print("✅ Gateway is running")
    except:
        print("❌ Gateway not running! Please start it first:")
        print("   cd local_gateway && python app.py")
        return
    
    # Test results
    results = []
    
    # === HEALTH ENDPOINTS ===
    print("\n📊 HEALTH ENDPOINTS")
    print("-" * 30)
    
    results.append(test_endpoint(
        "GET", "/health/heartbeat", 
        description="Basic Heartbeat Check"
    ))
    
    results.append(test_endpoint(
        "GET", "/api/v1/health",
        description="Full Health Status"
    ))
    
    # === DOCUMENTATION ===
    print("\n📚 DOCUMENTATION")
    print("-" * 30)
    
    results.append(test_endpoint(
        "GET", "/api/v1/endpoints",
        description="List All Endpoints"
    ))
    
    # === AI DETECTION ===
    print("\n🤖 AI DETECTION")
    print("-" * 30)
    
    results.append(test_endpoint(
        "POST", "/api/v1/detect-ai",
        data={"text": "This is a sample text to test AI detection capabilities."},
        description="AI Text Detection"
    ))
    
    # === TEXT GENERATION ===
    print("\n✨ TEXT GENERATION")
    print("-" * 30)
    
    results.append(test_endpoint(
        "POST", "/api/v1/generate-text",
        data={
            "text": "Jelaskan tentang kecerdasan buatan dalam 2 kalimat",
            "max_new_tokens": 100,
            "temperature": 0.7
        },
        description="Text Generation"
    ))
    
    results.append(test_endpoint(
        "POST", "/api/v1/chat",
        data={
            "text": "Halo, apa kabar?",
            "max_new_tokens": 50
        },
        description="Chat Interface"
    ))
    
    # === PROMPT EVALUATION ===
    print("\n📝 PROMPT EVALUATION")
    print("-" * 30)
    
    results.append(test_endpoint(
        "POST", "/api/v1/evaluate",
        data={"prompt": "Write a comprehensive guide about machine learning for beginners"},
        description="Gemini Prompt Evaluation"
    ))
    
    results.append(test_endpoint(
        "POST", "/api/v1/evaluate-goto",
        data={"prompt": "Buatlah panduan lengkap tentang machine learning untuk pemula"},
        description="GoTo Prompt Evaluation (Indonesian)"
    ))
    
    # === SUMMARY ===
    print("\n" + "=" * 50)
    print("📊 TEST SUMMARY")
    print("=" * 50)
    
    total_tests = len(results)
    passed_tests = sum(results)
    failed_tests = total_tests - passed_tests
    
    print(f"Total Tests: {total_tests}")
    print(f"✅ Passed: {passed_tests}")
    print(f"❌ Failed: {failed_tests}")
    print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
    
    if failed_tests == 0:
        print("\n🎉 All tests passed! Gateway is working correctly.")
    else:
        print(f"\n⚠️  {failed_tests} test(s) failed. Check backend connectivity.")
        
    print("\n📋 Gateway Info:")
    print(f"   URL: {GATEWAY_URL}")
    print(f"   Endpoints: {GATEWAY_URL}/api/v1/endpoints")

if __name__ == "__main__":
    main()
