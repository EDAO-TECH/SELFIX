#!/bin/bash

echo "[🧹] Uvicorn cleanup started at $(date +%Y-%m-%d_%H:%M:%S)"

# Get all running uvicorn processes
UVICORN_PROCESSES=$(ps aux | grep uvicorn | grep -v grep)

# Loop through each process
echo "$UVICORN_PROCESSES" | while read -r line; do
    if echo "$line" | grep -q "main_api:app --host 0.0.0.0 --port 8080"; then
        echo "[OK] Preserving SELFIX API on port 8080 (main_api:app)"
    else
        PID=$(echo "$line" | awk '{print $2}')
        CMD=$(echo "$line" | cut -d' ' -f11-)
        echo "[KILL] Terminating PID $PID -> $CMD"
        kill -9 "$PID"
    fi
done

echo "[✅] Cleanup complete."
