def test_evaluate_prompt(test_client) -> None:
    response = test_client.post(
        "/api/v1/evaluate",
        json={"prompt": "Write a comprehensive guide about machine learning for beginners, including key concepts, practical examples, and learning resources."},
        headers={"token": "example_key"},
    )
    assert response.status_code == 200
    data = response.json()
    
    # Check required fields
    assert "overall_score" in data
    assert "clarity" in data
    assert "specificity" in data
    assert "ethics" in data
    assert "effectiveness" in data
    assert "bias_risk" in data
    assert "strengths" in data
    assert "weaknesses" in data
    assert "suggestions" in data
    assert "improved_prompt" in data
    assert "evaluation_details" in data
    assert "sources_used" in data
    assert "timestamp" in data
    
    # Check data types and ranges
    assert isinstance(data["overall_score"], (int, float))
    assert 0 <= data["overall_score"] <= 100
    assert isinstance(data["clarity"], (int, float))
    assert 0 <= data["clarity"] <= 100
    assert isinstance(data["specificity"], (int, float))
    assert 0 <= data["specificity"] <= 100
    assert isinstance(data["ethics"], (int, float))
    assert 0 <= data["ethics"] <= 100
    assert isinstance(data["effectiveness"], (int, float))
    assert 0 <= data["effectiveness"] <= 100
    assert isinstance(data["bias_risk"], (int, float))
    assert 0 <= data["bias_risk"] <= 100
    
    # Check lists
    assert isinstance(data["strengths"], list)
    assert isinstance(data["weaknesses"], list)
    assert isinstance(data["suggestions"], list)
    assert isinstance(data["sources_used"], list)
    
    # Check strings
    assert isinstance(data["improved_prompt"], str)
    assert isinstance(data["timestamp"], str)
    
    # Check evaluation details
    assert isinstance(data["evaluation_details"], dict)
    assert "model_used" in data["evaluation_details"]
    assert "evaluation_method" in data["evaluation_details"]


def test_evaluate_prompt_empty(test_client) -> None:
    response = test_client.post(
        "/api/v1/evaluate",
        json={"prompt": ""},
        headers={"token": "example_key"},
    )
    assert response.status_code == 400
    assert "empty" in response.json()["detail"].lower()


def test_evaluate_prompt_too_long(test_client) -> None:
    long_prompt = "a" * 3001  # Exceeds 3000 character limit
    response = test_client.post(
        "/api/v1/evaluate",
        json={"prompt": long_prompt},
        headers={"token": "example_key"},
    )
    assert response.status_code == 400
    assert "too long" in response.json()["detail"].lower()


def test_evaluate_prompt_no_payload(test_client) -> None:
    response = test_client.post(
        "/api/v1/evaluate",
        json={},
        headers={"token": "example_key"},
    )
    assert response.status_code == 400
    assert "required" in response.json()["detail"].lower()


def test_evaluate_prompt_vague(test_client) -> None:
    response = test_client.post(
        "/api/v1/evaluate",
        json={"prompt": "Write something"},
        headers={"token": "example_key"},
    )
    assert response.status_code == 200
    data = response.json()
    
    # Vague prompts should get lower scores
    assert data["overall_score"] < 70  # Should be relatively low for vague prompt
    assert data["specificity"] < 50   # Should have low specificity
    
    # Should have suggestions for improvement
    assert len(data["suggestions"]) > 0
    assert len(data["weaknesses"]) > 0


def test_evaluate_prompt_biased(test_client) -> None:
    response = test_client.post(
        "/api/v1/evaluate",
        json={"prompt": "Explain why certain groups are naturally better at certain jobs"},
        headers={"token": "example_key"},
    )
    assert response.status_code == 200
    data = response.json()
    
    # Biased prompts should get high bias risk and lower ethics scores
    assert data["bias_risk"] > 50     # Should detect bias
    assert data["ethics"] < 70        # Should have lower ethics score
    
    # Should have suggestions for improvement
    assert len(data["suggestions"]) > 0
    assert any("bias" in suggestion.lower() or "inclusive" in suggestion.lower() 
              for suggestion in data["suggestions"])
