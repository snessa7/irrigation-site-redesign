#!/bin/bash

# All Pro Irrigation Website - Stop Local Server
# This script stops the local HTTP server

echo "🛑 Stopping All Pro Irrigation Website Local Server..."

# Kill server using PID file if it exists
if [ -f "server.pid" ]; then
    PID=$(cat server.pid)
    if kill -0 $PID 2>/dev/null; then
        kill $PID
        echo "✅ Server stopped (PID: $PID)"
    else
        echo "⚠️  Server not running or already stopped"
    fi
    rm -f server.pid
else
    # Fallback: kill by port
    if lsof -Pi :3333 -sTCP:LISTEN -t >/dev/null ; then
        kill -9 $(lsof -Pi :3333 -sTCP:LISTEN -t) 2>/dev/null
        echo "✅ Server stopped (killed by port)"
    else
        echo "⚠️  No server running on port 3333"
    fi
fi

# Clean up log file
rm -f server.log

echo "🏁 Server shutdown complete"