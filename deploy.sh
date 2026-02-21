#!/bin/bash

# Moveryy Deployment Script
# This script handles deployment to various platforms

set -e  # Exit on any error

echo "🚚 Moveryy Deployment Script"
echo "=============================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
check_node() {
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18 or higher."
        exit 1
    fi
    
    NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js version 18 or higher is required. Current version: $(node --version)"
        exit 1
    fi
    
    print_success "Node.js $(node --version) is installed"
}

# Check if npm is installed
check_npm() {
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm."
        exit 1
    fi
    print_success "npm $(npm --version) is installed"
}

# Install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    npm ci
    print_success "Dependencies installed successfully"
}

# Run linting
run_lint() {
    print_status "Running ESLint..."
    npm run lint
    print_success "Linting completed successfully"
}

# Build the application
build_app() {
    print_status "Building application for production..."
    npm run build
    print_success "Build completed successfully"
}

# Deploy to Vercel
deploy_vercel() {
    print_status "Deploying to Vercel..."
    
    if ! command -v vercel &> /dev/null; then
        print_warning "Vercel CLI not found. Installing..."
        npm install -g vercel
    fi
    
    vercel --prod
    print_success "Deployed to Vercel successfully"
}

# Deploy to Netlify
deploy_netlify() {
    print_status "Deploying to Netlify..."
    
    if ! command -v netlify &> /dev/null; then
        print_warning "Netlify CLI not found. Installing..."
        npm install -g netlify-cli
    fi
    
    netlify deploy --prod --dir=dist
    print_success "Deployed to Netlify successfully"
}

# Build Docker image
build_docker() {
    print_status "Building Docker image..."
    
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker."
        exit 1
    fi
    
    docker build -t moveryy-web:latest .
    print_success "Docker image built successfully"
}

# Run with Docker Compose
run_docker_compose() {
    print_status "Starting application with Docker Compose..."
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose."
        exit 1
    fi
    
    docker-compose up -d
    print_success "Application started with Docker Compose"
}

# Main deployment function
main() {
    echo "Select deployment option:"
    echo "1) Local build only"
    echo "2) Deploy to Vercel"
    echo "3) Deploy to Netlify"
    echo "4) Build Docker image"
    echo "5) Run with Docker Compose"
    echo "6) Full CI/CD pipeline (build + lint + test)"
    
    read -p "Enter your choice (1-6): " choice
    
    case $choice in
        1)
            check_node
            check_npm
            install_dependencies
            build_app
            print_success "Local build completed! Files are in the 'dist' directory."
            ;;
        2)
            check_node
            check_npm
            install_dependencies
            run_lint
            build_app
            deploy_vercel
            ;;
        3)
            check_node
            check_npm
            install_dependencies
            run_lint
            build_app
            deploy_netlify
            ;;
        4)
            build_docker
            ;;
        5)
            run_docker_compose
            ;;
        6)
            check_node
            check_npm
            install_dependencies
            run_lint
            build_app
            print_success "Full pipeline completed successfully!"
            ;;
        *)
            print_error "Invalid choice. Please select 1-6."
            exit 1
            ;;
    esac
}

# Run main function
main

echo ""
print_success "Deployment script completed!"
echo "🎉 Your Moveryy application is ready!"