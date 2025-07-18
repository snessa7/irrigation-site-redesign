#!/bin/bash

# All Pro Irrigation Website - Local Development Server
# This script starts a local HTTP server for testing the website

echo "🏗️  Starting All Pro Irrigation Website Local Server..."

# Kill any existing server on port 3333
if lsof -Pi :3333 -sTCP:LISTEN -t >/dev/null ; then
    echo "🔄 Stopping existing server on port 3333..."
    kill -9 $(lsof -Pi :3333 -sTCP:LISTEN -t) 2>/dev/null || true
fi

# Start the server
echo "🚀 Starting server on port 3333..."
python3 -m http.server 3333 &
SERVER_PID=$!

# Wait a moment for server to start
sleep 2

# Test if server is running
if curl -s http://localhost:3333/ > /dev/null; then
    echo "✅ Server started successfully!"
    echo ""
    echo "🌐 Website URLs:"
    echo "   Local:     http://localhost:3333/"
    echo "   Network:   http://$(ipconfig getifaddr en0):3333/"
    echo ""
    echo "📁 Serving files from: $(pwd)"
    echo ""
    echo "🛑 To stop the server:"
    echo "   kill $SERVER_PID"
    echo "   or run: ./stop-server.sh"
    echo ""
    echo "🔄 Server is running in background (PID: $SERVER_PID)"
    echo $SERVER_PID > server.pid
else
    echo "❌ Failed to start server"
    exit 1
fi