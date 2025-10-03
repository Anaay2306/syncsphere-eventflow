#!/bin/bash

# SyncSphere EventFlow - Railway Deployment Script

echo "🚀 Deploying SyncSphere EventFlow to Railway..."

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Please install it first:"
    echo "npm install -g @railway/cli"
    exit 1
fi

# Login to Railway (if not already logged in)
echo "🔐 Checking Railway authentication..."
railway login

# Create a new Railway project (if not exists)
echo "📦 Setting up Railway project..."
railway link

# Set environment variables
echo "🔧 Setting up environment variables..."
echo "Please set your Supabase credentials in Railway dashboard:"
echo "- VITE_SUPABASE_URL"
echo "- VITE_SUPABASE_ANON_KEY"

# Deploy to Railway
echo "🚀 Deploying to Railway..."
railway up

echo "✅ Deployment complete!"
echo "🌐 Your app will be available at the Railway-provided URL"
