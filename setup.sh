#!/bin/bash
# Quick Start Script for Student Management App
# Linux/Mac Script

echo ""
echo "====================================================="
echo " Student Management App - Quick Start"
echo "====================================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed. Please install Node.js 16+"
    exit 1
fi

echo "[OK] Node.js is installed:"
node --version

echo ""
echo "Installing dependencies..."
npm install

echo ""
echo "Setting up environment..."
if [ ! -f ".env.local" ]; then
    echo "Creating .env.local from .env.example..."
    cp .env.example .env.local
    echo "[OK] .env.local created. Please update with your settings."
fi

echo ""
echo "Creating data directory..."
mkdir -p data

echo ""
echo "====================================================="
echo " Setup Complete!"
echo "====================================================="
echo ""
echo "To start the development server, run:"
echo "  npm run dev"
echo ""
echo "Then open: http://localhost:3000"
echo ""
