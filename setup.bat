@echo off
REM Quick Start Script for Student Management App
REM Windows Batch Script

echo.
echo =====================================================
echo  Student Management App - Quick Start
echo =====================================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if errorlevel 1 (
    echo [ERROR] Node.js is not installed. Please install Node.js 16+
    pause
    exit /b 1
)

echo [OK] Node.js is installed: 
node --version

echo.
echo Installing dependencies...
call npm install

echo.
echo Setting up environment...
if not exist ".env.local" (
    echo Creating .env.local from .env.example...
    copy .env.example .env.local
    echo [OK] .env.local created. Please update with your settings.
)

echo.
echo Creating data directory...
if not exist "data" mkdir data

echo.
echo =====================================================
echo  Setup Complete!
echo =====================================================
echo.
echo To start the development server, run:
echo   npm run dev
echo.
echo Then open: http://localhost:3000
echo.
pause
