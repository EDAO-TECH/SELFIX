#!/bin/bash

BASE_DIR=$(pwd)
LOG_DIR="$BASE_DIR/logs"
DATA_DIR="$BASE_DIR/data"
SCRIPT_DIR="$BASE_DIR/scripts"
BACKUP_DIR="$BASE_DIR/backups"
TEMPLATE_DIR="$BASE_DIR/templates"

echo "[INFO] Starting SELFIX CyberDefense Stack..."

# ────────────────────────────────────────────────
# 🔧 Pre-launch Cleanup
# ────────────────────────────────────────────────
echo "[INFO] Cleaning up previous logs and PID files..."
rm -f "$LOG_DIR"/*.pid
rm -f "$BASE_DIR/nohup.out"
mkdir -p "$LOG_DIR"

# ────────────────────────────────────────────────
# 🔁 Log Rotation & Backup
# ────────────────────────────────────────────────
echo "[INFO] Rotating logs and backing up critical state..."
TIMESTAMP=$(date '+%Y%m%d-%H%M%S')
mkdir -p "$BACKUP_DIR"
cp "$DATA_DIR/ai_phase_log.json" "$BACKUP_DIR/entropy_fix_cpu_${TIMESTAMP}.bak" 2>/dev/null || echo "[INFO] No previous AI phase log to backup."

# ────────────────────────────────────────────────
# ⚙️ Launch Order
# ────────────────────────────────────────────────
echo "[INFO] Running Seeder..."
python3 "$SCRIPT_DIR/seed_agents.py" &

echo "[INFO] Running System Verifier..."
python3 "$SCRIPT_DIR/verify_engine.py" || {
    echo "[ERROR] Verification failed. Check $LOG_DIR/verify_log.json. Aborting install."
    exit 1
}

echo "[INFO] Starting Healing Loop..."
nohup python3 "$BASE_DIR/healing_loop.py" >> "$LOG_DIR/healing_loop.log" 2>&1 &

echo "[INFO] Launching Healing Daemon..."
nohup python3 "$BASE_DIR/healing_daemon.py" >> "$LOG_DIR/healing_loop.log" 2>&1 &

echo "[INFO] Launching Local AI..."
nohup python3 "$BASE_DIR/local_ai.py" >> "$LOG_DIR/healing_loop.log" 2>&1 &

echo "[INFO] Launching Seeder Agent..."
nohup python3 "$SCRIPT_DIR/seed_agents.py" >> "$LOG_DIR/healing_loop.log" 2>&1 &

# ────────────────────────────────────────────────
# 📊 Final System Status Check
# ────────────────────────────────────────────────
echo "[INFO] Running system status check..."
python3 "$SCRIPT_DIR/defender_status.py"

echo "[SUCCESS] SELFIX Defense Stack is up and running."
echo "Check logs in: $LOG_DIR"
echo "Run 'tail -f $LOG_DIR/healing_loop.log' to monitor healing loop activity."
echo "[INFO] Rehydrating past AI knowledge and status..."

# Restore AI context
mkdir -p "$DATA_DIR"
if [ -f "$DATA_DIR/ai_journal.json" ]; then
    echo "[OK] AI journal found."
else
    echo "{}" > "$DATA_DIR/ai_journal.json"
fi

# Restore System Status
if [ -f "$DATA_DIR/system_status.json" ]; then
    echo "[OK] System status restored."
else
    cp "$TEMPLATE_DIR/default_system_status.json" "$DATA_DIR/system_status.json" 2>/dev/null || echo "{}" > "$DATA_DIR/system_status.json"
fi

# Restore Karma Logs
if [ -f "$DATA_DIR/promoted_log.json" ]; then
    echo "[OK] Karma logs rehydrated."
fi
