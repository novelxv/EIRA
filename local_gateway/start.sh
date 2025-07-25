#!/bin/bash
# EIRA Local Gateway Startup Script

echo "🚀 Starting EIRA Local Gateway..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 not found. Please install Python 3."
    exit 1
fi

# Check if pip is installed
if ! command -v pip3 &> /dev/null; then
    echo "❌ pip3 not found. Please install pip."
    exit 1
fi

# Install requirements
echo "📦 Installing requirements..."
pip3 install -r requirements.txt

# Check if installation was successful
if [ $? -ne 0 ]; then
    echo "❌ Failed to install requirements."
    exit 1
fi

echo "✅ Requirements installed successfully."

# Start the gateway
echo "🌐 Starting gateway on http://localhost:5000..."
echo "📋 Available endpoints: http://localhost:5000/api/v1/endpoints"
echo "🧪 Run tests: python3 test_gateway.py"
echo ""
echo "Press Ctrl+C to stop the gateway"
echo ""

python3 app.py
