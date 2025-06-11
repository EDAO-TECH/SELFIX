# 📄 File: /opt/edao/app/core/rollback_manager.py

import os
import shutil
import time
import json
from pathlib import Path

TARGETS = [
    "app/core/trap_logic.py",
    "app/core/yin_engine.py",
    "app/core/healer.py"
]

LOG_PATH = Path("data/healing_log.json")

def log_event(message):
    entry = {
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "event": message
    }
    if LOG_PATH.exists():
        data = json.loads(LOG_PATH.read_text())
    else:
        data = []
    data.append(entry)
    LOG_PATH.write_text(json.dumps(data[-100:], indent=2))

def attempt_rollback(target_file):
    backup_file = f"{target_file}.bak"
    if os.path.exists(backup_file):
        shutil.copy(backup_file, target_file)
        log_event(f"♻️ Restored {target_file} from backup.")
        return True
    else:
        log_event(f"❌ Backup not found for {target_file}.")
        return False

def main():
    log_event("🧪 Rollback manager engaged")
    success = True
    for file in TARGETS:
        if not attempt_rollback(file):
            success = False

    if success:
        log_event("✅ All modules restored from backup.")
        exit(0)
    else:
        log_event("⚠️ Partial or failed rollback.")
        exit(1)

if __name__ == "__main__":
    main()
