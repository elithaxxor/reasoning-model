#!/bin/bash

set -e

echo "🔍 Detecting OS..."
OS=$(uname -s)

if [ "$OS" = "Darwin" ]; then
    echo "🛠 Detected macOS"
    echo "🔧 Installing TA-Lib via Homebrew..."
    brew install ta-lib || echo "⚠️ Please install Homebrew if not available: https://brew.sh/"
elif [ "$OS" = "Linux" ]; then
    echo "🛠 Detected Linux"
    if [ -f /etc/lsb-release ] && grep -q 'Ubuntu' /etc/lsb-release; then
        echo "🔧 Installing TA-Lib via APT..."
        sudo apt update
        sudo apt install -y libta-lib0 libta-lib-dev
    else
        echo "❌ Unsupported Linux distribution. Please install TA-Lib manually."
        exit 1
    fi
else
    echo "❌ Unsupported OS: $OS"
    exit 1
fi

echo "🐍 Setting up Python virtual environment..."
python3 -m venv .venv
source .venv/bin/activate

echo "📦 Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

echo "🚀 Launching trading bot..."
python3 trader_03.py