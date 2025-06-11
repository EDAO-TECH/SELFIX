# 📄 File: /opt/SELFIX/local_ai.py

import json
import time
from pathlib import Path
import os

# ⬇️ Import the mission context
from ai_modules.selfix_mission_context import MissionContext

STATUS_FILE = Path("/opt/SELFIX/data/system_status.json")
PHASE_LOG = Path("/opt/SELFIX/data/ai_phase_log.json")

# ⬇️ Initialize and log mission context
mission = MissionContext()
context = mission.get_context()
print(f"[🧠 SELFIX Local AI] Goal: {context['goal']}")
print(f"[💬 Reminder to agents]: {context['reminder']}")
mission.add_event("🟢 Local AI initialized with context awareness.")

def log_phase(event):
    log_entry = {
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "event": event
    }
    if PHASE_LOG.exists():
        existing = json.loads(PHASE_LOG.read_text())
    else:
        existing = []
    existing.append(log_entry)
    PHASE_LOG.write_text(json.dumps(existing[-50:], indent=2))  # Keep last 50 entries

def local_ai_loop():
    mode = "unknown"
    if STATUS_FILE.exists():
        with STATUS_FILE.open() as f:
            status = json.load(f)
            mode = status.get("system_mode", "unknown")
            healing = status.get("healing_active", False)
    else:
        log_phase("⚠️ No status file found. Assuming safe/passive.")
        return

    log_phase(f"🧠 Local AI initiated in mode: {mode}")

    if mode == "autonomous" and healing:
        while True:
            log_phase("✅ Healing active: system watching entropy...")
            time.sleep(30)
    elif mode == "passive_monitor":
        log_phase("🔍 Passive monitoring: no healing engaged")
    elif mode == "quarantine":
        log_phase("🔒 Quarantine mode: observation only, escalation required")
    else:
        log_phase(f"❓ Unknown system mode: {mode}")

if __name__ == "__main__":
    try:
        local_ai_loop()
    except KeyboardInterrupt:
        print("🛑 Local AI stopped by user.")
    except Exception as e:
        log_phase(f"❌ Local AI exception: {str(e)}")
