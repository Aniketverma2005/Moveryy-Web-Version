@echo off
setlocal enabledelayedexpansion

REM Moveryy Deployment Script for Windows
REM This script handles deployment to various platforms

echo.
echo 🚚 Moveryy Deployment Script (Windows)
echo ======================================

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed. Please install Node.js 18 or higher.
    pause
    exit /b 1
)

echo [SUCCESS] Node.js is installed: 
node --version

REM Check if npm is installed
npm --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] npm is not installed. Please install npm.
    pause
    exit /b 1
)

echo [SUCCESS] npm is installed: 
npm --version

echo.
echo Select deployment option:
echo 1) Local build only
echo 2) Deploy to Vercel
echo 3) Deploy to Netlify
echo 4) Build Docker image
echo 5) Run with Docker Compose
echo 6) Full CI/CD pipeline (build + lint)
echo.

set /p choice="Enter your choice (1-6): "

if "%choice%"=="1" goto local_build
if "%choice%"=="2" goto deploy_vercel
if "%choice%"=="3" goto deploy_netlify
if "%choice%"=="4" goto build_docker
if "%choice%"=="5" goto run_docker_compose
if "%choice%"=="6" goto full_pipeline

echo [ERROR] Invalid choice. Please select 1-6.
pause
exit /b 1

:local_build
echo [INFO] Installing dependencies...
call npm ci
if errorlevel 1 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)

echo [INFO] Building application for production...
call npm run build
if errorlevel 1 (
    echo [ERROR] Build failed
    pause
    exit /b 1
)

echo [SUCCESS] Local build completed! Files are in the 'dist' directory.
goto end

:deploy_vercel
echo [INFO] Installing dependencies...
call npm ci

echo [INFO] Running linter...
call npm run lint

echo [INFO] Building application...
call npm run build

echo [INFO] Deploying to Vercel...
vercel --version >nul 2>&1
if errorlevel 1 (
    echo [INFO] Installing Vercel CLI...
    call npm install -g vercel
)

call vercel --prod
echo [SUCCESS] Deployed to Vercel successfully!
goto end

:deploy_netlify
echo [INFO] Installing dependencies...
call npm ci

echo [INFO] Running linter...
call npm run lint

echo [INFO] Building application...
call npm run build

echo [INFO] Deploying to Netlify...
netlify --version >nul 2>&1
if errorlevel 1 (
    echo [INFO] Installing Netlify CLI...
    call npm install -g netlify-cli
)

call netlify deploy --prod --dir=dist
echo [SUCCESS] Deployed to Netlify successfully!
goto end

:build_docker
echo [INFO] Building Docker image...
docker --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Docker is not installed. Please install Docker.
    pause
    exit /b 1
)

call docker build -t moveryy-web:latest .
echo [SUCCESS] Docker image built successfully!
goto end

:run_docker_compose
echo [INFO] Starting application with Docker Compose...
docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Docker Compose is not installed. Please install Docker Compose.
    pause
    exit /b 1
)

call docker-compose up -d
echo [SUCCESS] Application started with Docker Compose!
goto end

:full_pipeline
echo [INFO] Installing dependencies...
call npm ci

echo [INFO] Running linter...
call npm run lint

echo [INFO] Building application...
call npm run build

echo [SUCCESS] Full pipeline completed successfully!
goto end

:end
echo.
echo [SUCCESS] Deployment script completed!
echo 🎉 Your Moveryy application is ready!
echo.
pause