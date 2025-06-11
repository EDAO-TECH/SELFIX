#!/bin/bash

echo "[INFO] Starting SELFIX CyberDefense Stack..."

# ────────────────────────────────────────────────
# 🔧 Pre-launch Cleanup
# ────────────────────────────────────────────────
echo "[INFO] Cleaning up previous logs and PID files..."
rm -f /opt/SELFIX/logs/*.pid
rm -f /opt/SELFIX/nohup.out
mkdir -p /opt/SELFIX/logs

# ────────────────────────────────────────────────
# 🔁 Log Rotation & Backup
# ────────────────────────────────────────────────
echo "[INFO] Rotating logs and backing up critical state..."
TIMESTAMP=$(date '+%Y%m%d-%H%M%S')
cp /opt/SELFIX/data/ai_phase_log.json "/opt/SELFIX/backups/entropy_fix_cpu_${TIMESTAMP}.bak" 2>/dev/null

# ────────────────────────────────────────────────
# ⚙️ Launch Order
# ────────────────────────────────────────────────

echo "[INFO] Running Seeder..."
python3 /opt/SELFIX/scripts/seed_agents.py &

echo "[INFO] Running System Verifier..."
python3 /opt/SELFIX/verify_engine.py || {
    echo "[ERROR] Verification failed. Check /opt/SELFIX/logs/verify_log.json. Aborting install."
    exit 1
}

echo "[INFO] Starting Healing Loop..."
nohup python3 /opt/SELFIX/healing_loop.py >> /opt/SELFIX/logs/healing_loop.log 2>&1 &

echo "[INFO] Launching Healing Daemon..."
nohup python3 /opt/SELFIX/healing_daemon.py >> /opt/SELFIX/logs/healing_loop.log 2>&1 &

echo "[INFO] Launching Local AI..."
nohup python3 /opt/SELFIX/local_ai.py >> /opt/SELFIX/logs/healing_loop.log 2>&1 &

echo "[INFO] Launching Seeder Agent..."
nohup python3 /opt/SELFIX/scripts/seed_agents.py >> /opt/SELFIX/logs/healing_loop.log 2>&1 &

# ────────────────────────────────────────────────
# 📊 Final System Status Check
# ────────────────────────────────────────────────
echo "[INFO] Running system status check..."
python3 /opt/SELFIX/scripts/defender_status.py

echo "[SUCCESS] SELFIX Defense Stack is up and running."
echo "Check logs in: /opt/SELFIX/logs"
echo "Run 'tail -f /opt/SELFIX/logs/healing_loop.log' to monitor healing loop activity."
echo "[INFO] Rehydrating past AI knowledge and status..."

# Restore AI context
if [ -f /opt/SELFIX/data/ai_journal.json ]; then
    echo "[OK] AI journal found."
else
    echo "{}" > /opt/SELFIX/data/ai_journal.json
fi

# Restore System Status
if [ -f /opt/SELFIX/data/system_status.json ]; then
    echo "[OK] System status restored."
else
    cp /opt/SELFIX/templates/default_system_status.json /opt/SELFIX/data/system_status.json 2>/dev/null || echo "{}" > /opt/SELFIX/data/system_status.json
fi

# Restore Karma Logs
if [ -f /opt/SELFIX/data/promoted_log.json ]; then
    echo "[OK] Karma logs rehydrated."
fi
