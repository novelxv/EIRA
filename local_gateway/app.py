import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
import logging

# Inisialisasi aplikasi Flask
app = Flask(__name__)

# Terapkan CORS ke aplikasi Anda agar bisa diakses dari front-end
# Ini mengizinkan semua domain, cocok untuk development.
# Untuk produksi, Anda bisa membatasinya ke domain FE Anda, misal: CORS(app, origins="https.your-frontend.com")
# CORS for localhost:5173
CORS(app, origins=["http://localhost:5173"])

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# --- Konfigurasi ---
# URL API tujuan yang akan Anda panggil
BASE_TARGET_API_URL = "https://8fbddf283704.ngrok-free.app"
API_TOKEN = "85ce9e41-8848-45b7-a608-e3ad168d378c"


def make_api_request(endpoint_path, data=None, method='POST'):
    """
    Helper function untuk mengirim request ke API backend
    """
    headers = {
        'token': API_TOKEN,
        'Content-Type': 'application/json'
    }
    
    url = BASE_TARGET_API_URL + endpoint_path
    
    try:
        if method == 'GET':
            response = requests.get(url, headers=headers)
        else:  # POST
            response = requests.post(url, headers=headers, json=data)

        # Coba dapatkan respons JSON dari API tujuan
        try:
            response_data = response.json()
        except requests.exceptions.JSONDecodeError:
            return jsonify({
                "error": "Gagal mem-parsing respons dari API tujuan",
                "status_code": response.status_code,
                "content": response.text
            }), 502

        return jsonify(response_data), response.status_code

    except requests.exceptions.RequestException as e:
        logger.error(f"Error saat menghubungi API tujuan: {e}")
        return jsonify({"error": "Gagal menghubungi API tujuan", "details": str(e)}), 504


# === HEALTH ENDPOINTS ===

@app.route('/health/heartbeat', methods=['GET'])
def gateway_heartbeat():
    """
    Health check endpoint - heartbeat
    """
    return make_api_request("/health/heartbeat", method='GET')


@app.route('/api/v1/health', methods=['GET'])
def gateway_health():
    """
    Health check endpoint - full health status
    """
    print("Checking health status...")
    return make_api_request("/api/v1/health", method='GET')


# === AI DETECTION ENDPOINTS ===

@app.route('/api/v1/detect-ai', methods=['POST'])
def gateway_detect_ai():
    """
    AI Detection endpoint
    Detects if text is AI-generated or human-written
    """
    try:
        data = request.get_json()
        if 'text' not in data:
            return jsonify({"error": "Field 'text' tidak ditemukan di body request"}), 400
    except Exception:
        return jsonify({"error": "Body request tidak valid atau bukan JSON"}), 400

    return make_api_request("/api/v1/detect-ai", data)


# === TEXT GENERATION ENDPOINTS ===

@app.route('/api/v1/generate-text', methods=['POST'])
def gateway_generate_text():
    """
    Text generation endpoint using Gemma2-9B model
    """
    try:
        data = request.get_json()
        if 'text' not in data:
            return jsonify({"error": "Field 'text' tidak ditemukan di body request"}), 400
    except Exception:
        return jsonify({"error": "Body request tidak valid atau bukan JSON"}), 400

    return make_api_request("/api/v1/generate-text", data)


@app.route('/api/v1/chat', methods=['POST'])
def gateway_chat():
    """
    Chat endpoint using Gemma2-9B model
    Simplified chat interface for conversational text generation
    """
    try:
        data = request.get_json()
        if 'text' not in data:
            return jsonify({"error": "Field 'text' tidak ditemukan di body request"}), 400
    except Exception:
        return jsonify({"error": "Body request tidak valid atau bukan JSON"}), 400

    return make_api_request("/api/v1/chat", data)


# === PROMPT EVALUATION ENDPOINTS ===

@app.route('/api/v1/evaluate', methods=['POST'])
def gateway_evaluate_gemini():
    """
    Prompt evaluation endpoint using Gemini model
    """
    try:
        data = request.get_json()
        if 'prompt' not in data:
            return jsonify({"error": "Field 'prompt' tidak ditemukan di body request"}), 400
    except Exception:
        return jsonify({"error": "Body request tidak valid atau bukan JSON"}), 400

    return make_api_request("/api/v1/evaluate", data)


@app.route('/api/v1/evaluate-goto', methods=['POST'])
def gateway_evaluate_goto():
    """
    Prompt evaluation endpoint using GoTo model
    Endpoint ini bertindak sebagai gateway.
    Menerima request dari FE, meneruskannya ke API tujuan,
    dan mengembalikan responsnya ke FE.
    """
    try:
        data = request.get_json()
        if 'prompt' not in data:
            return jsonify({"error": "Field 'prompt' tidak ditemukan di body request"}), 400
    except Exception:
        return jsonify({"error": "Body request tidak valid atau bukan JSON"}), 400

    return make_api_request("/api/v1/evaluate-goto", data)


# === API DOCUMENTATION ENDPOINT ===

@app.route('/api/v1/endpoints', methods=['GET'])
def list_endpoints():
    """
    List all available endpoints in the gateway
    """
    endpoints = {
        "health": {
            "heartbeat": {
                "method": "GET",
                "path": "/health/heartbeat",
                "description": "Basic heartbeat check"
            },
            "health": {
                "method": "GET", 
                "path": "/api/v1/health",
                "description": "Full health status including model connectivity"
            }
        },
        "ai_detection": {
            "detect_ai": {
                "method": "POST",
                "path": "/api/v1/detect-ai",
                "description": "Detect if text is AI-generated or human-written",
                "required_fields": ["text"]
            }
        },
        "text_generation": {
            "generate_text": {
                "method": "POST",
                "path": "/api/v1/generate-text", 
                "description": "Generate text using Gemma2-9B model",
                "required_fields": ["text"],
                "optional_fields": ["system_message", "conversation_history", "max_new_tokens", "temperature"]
            },
            "chat": {
                "method": "POST",
                "path": "/api/v1/chat",
                "description": "Chat interface using Gemma2-9B model",
                "required_fields": ["text"],
                "optional_fields": ["conversation_history", "max_new_tokens", "temperature"]
            }
        },
        "prompt_evaluation": {
            "evaluate_gemini": {
                "method": "POST",
                "path": "/api/v1/evaluate",
                "description": "Evaluate prompts using Gemini 2.5 Pro model",
                "required_fields": ["prompt"]
            },
            "evaluate_goto": {
                "method": "POST", 
                "path": "/api/v1/evaluate-goto",
                "description": "Evaluate prompts using GoTo model (Indonesian optimized)",
                "required_fields": ["prompt"]
            }
        }
    }
    
    return jsonify({
        "message": "EIRA Local Gateway API",
        "version": "1.0.0",
        "backend_url": BASE_TARGET_API_URL,
        "endpoints": endpoints
    })


# === ERROR HANDLERS ===

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        "error": "Endpoint not found",
        "message": "The requested endpoint does not exist",
        "available_endpoints": "/api/v1/endpoints"
    }), 404


@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        "error": "Internal server error",
        "message": "Something went wrong on the gateway server"
    }), 500


# Menjalankan server Flask
if __name__ == '__main__':
    print("🚀 EIRA Local Gateway starting...")
    print(f"📡 Backend API: {BASE_TARGET_API_URL}")
    print("📋 Available endpoints: http://localhost:5000/api/v1/endpoints")
    app.run(debug=True, port=5000)


# Menjalankan server Flask
if __name__ == '__main__':
    app.run(debug=True, port=5000)