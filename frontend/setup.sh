#!/bin/bash
# Quick Start Script for AI Chatbot Frontend

echo "🚀 AI Chatbot Frontend - Quick Start"
echo "===================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Navigate to frontend directory
cd "$(dirname "$0")" || exit

echo "📦 Installing dependencies..."
npm install

echo ""
echo "✨ Setup complete!"
echo ""
echo "To start the development server, run:"
echo "  npm run dev"
echo ""
echo "Default URLs:"
echo "  Frontend: http://localhost:5173"
echo "  Backend:  http://localhost:3000 (make sure it's running!)"
echo ""
echo "📝 Configure your backend URL in .env file if needed"
echo ""
echo "Happy coding! 🎉"
