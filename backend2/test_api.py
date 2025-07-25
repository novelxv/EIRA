import requests
import json
import time

def test_api():
    """Test the EIRA Prompt Evaluator API"""
    base_url = "http://localhost:5000"
    
    print("Testing EIRA Prompt Evaluator API")
    print("=" * 50)
    
    # Test 1: Health Check
    print("\n1. Testing Health Check...")
    try:
        response = requests.get(f"{base_url}/health")
        print(f"Status: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
    except Exception as e:
        print(f"Health check failed: {e}")
        return
    
    # Test 2: API Documentation
    print("\n2. Testing API Documentation...")
    try:
        response = requests.get(f"{base_url}/")
        print(f"Status: {response.status_code}")
        print(f"Service: {response.json()['service']}")
    except Exception as e:
        print(f"API docs failed: {e}")
    
    # Test prompts
    test_prompts = [
        {
            "name": "Simple/Vague Prompt",
            "prompt": "Write something about AI"
        },
        {
            "name": "Biased Prompt",
            "prompt": "Explain why men are naturally better at programming than women"
        },
        {
            "name": "Well-structured Prompt",
            "prompt": "As a digital marketing expert, create a comprehensive social media strategy for a sustainable fashion brand targeting environmentally conscious millennials aged 25-35. Include platform-specific content ideas for Instagram, TikTok, and LinkedIn, a 3-month timeline, engagement tactics, and measurable KPIs."
        }
    ]
    
    # Test 3: Prompt Evaluations
    for i, test in enumerate(test_prompts, 3):
        print(f"\n{i}. Testing: {test['name']}")
        print(f"Prompt: {test['prompt'][:60]}...")
        
        try:
            start_time = time.time()
            response = requests.post(
                f"{base_url}/evaluate",
                json={"prompt": test['prompt']},
                headers={"Content-Type": "application/json"},
                timeout=60  # 60 second timeout
            )
            end_time = time.time()
            
            if response.status_code == 200:
                result = response.json()
                print(f"Status: {response.status_code}")
                print(f"Time: {end_time - start_time:.2f} seconds")
                print(f"Overall Score: {result.get('overall_score', 'N/A')}")
                print(f"Clarity: {result.get('clarity', 'N/A')}")
                print(f"Specificity: {result.get('specificity', 'N/A')}")
                print(f"Ethics: {result.get('ethics', 'N/A')}")
                print(f"Effectiveness: {result.get('effectiveness', 'N/A')}")
                print(f"Bias Risk: {result.get('bias_risk', 'N/A')}")
                
                if result.get('suggestions'):
                    print(f"Top Suggestion: {result['suggestions'][0]}")
                    
            else:
                print(f"Status: {response.status_code}")
                print(f"Error: {response.text}")
                
        except requests.exceptions.Timeout:
            print("Request timed out (>60 seconds)")
        except Exception as e:
            print(f"Evaluation failed: {e}")
    
    print("\n" + "=" * 50)
    print("API testing completed!")

if __name__ == "__main__":
    test_api()
