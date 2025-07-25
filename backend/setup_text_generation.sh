#!/bin/bash
# Setup script for text generation functionality

echo "🚀 Setting up text generation with 8-bit quantization..."

# Check if we're in the backend directory
if [ ! -f "requirements.txt" ]; then
    echo "❌ Error: Please run this script from the backend directory"
    exit 1
fi

# Install new dependencies
echo "📦 Installing new dependencies..."
pip install bitsandbytes==0.44.1 accelerate==1.2.1

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  Warning: .env file not found. Creating from .env.example..."
    cp .env.example .env
    echo "📝 Please edit .env file with your actual configuration"
fi

# Test the installation
echo "🧪 Testing text generation setup..."
python test_text_generation.py

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Setup completed successfully!"
    echo ""
    echo "📚 Next steps:"
    echo "1. Make sure your .env file is properly configured"
    echo "2. Start the API server: uvicorn huggingfastapi.main:app --reload"
    echo "3. Access the API documentation at: http://localhost:8000/docs"
    echo ""
    echo "📖 See TEXT_GENERATION_API.md for detailed usage examples"
else
    echo "❌ Setup test failed. Please check the logs above."
    exit 1
fi
