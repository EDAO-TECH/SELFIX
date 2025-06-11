#!/usr/bin/env python3
import subprocess
import json
from pathlib import Path
from datetime import datetime
from karma_guard import update_karma, get_karma

# 🛠 Paths (SELFIX specific)
PROMOTED = Path("/opt/SELFIX/healing_modules/promoted")
TRIGGER = Path("/tmp/trigger_healing.txt")
JOURNAL = Path("/opt/SELFIX/data/ai_journal.json")
ALERTS = Path("/opt/selfix_companion/root_alerts")
MAX_FAILURES = 3
USER_ID = "agent002"

def run_healing(module_path: Path) -> bool:
    try:
        subprocess.run(["python3", str(module_path)], check=True)
        return True
    except Exception:
        return False

def append_to_journal(module: str, result: str, karma_delta: float):
    if JOURNAL.exists():
        log = json.loads(JOURNAL.read_text())
    else:
        log = []
    log.append({
        "timestamp": datetime.now().isoformat(),
        "module": module,
        "result": result,
        "karma_delta": karma_delta
    })
    JOURNAL.write_text(json.dumps(log, indent=2))

def get_recent_failures():
    if not JOURNAL.exists():
        return 0
    log = json.loads(JOURNAL.read_text())
    recent = log[-MAX_FAILURES:]
    return sum(1 for entry in recent if entry["result"] == "fail")

def send_root_alert(reason: str, module: str):
    ALERTS.mkdir(parents=True, exist_ok=True)
    alert = {
        "timestamp": datetime.now().isoformat(),
        "module": module,
        "reason": reason,
        "karma": get_karma(USER_ID)
    }
    filename = f"{module}_{int(datetime.now().timestamp())}.json"
    (ALERTS / filename).write_text(json.dumps(alert, indent=2))
    print(f"📡 Agent002 → Root Delegate: Alert logged ({reason})")

def main():
    if not TRIGGER.exists():
        return

    modules = list(PROMOTED.glob("entropy_*.py"))
    for mod in modules:
        success = run_healing(mod)
        if success:
            update_karma(USER_ID, boost=+0.1)
            append_to_journal(mod.name, "success", +0.1)
            print(f"✅ Healing success: {mod.name}")
        else:
            update_karma(USER_ID, boost=-0.2)
            append_to_journal(mod.name, "fail", -0.2)
            print(f"❌ Healing failed: {mod.name}")
            send_root_alert("healing_failed", mod.name)

        break  # one healing attempt per cycle

    if get_karma(USER_ID) < 0.3:
        send_root_alert("karma_too_low", "agent002")

    TRIGGER.unlink()

if __name__ == "__main__":
    main()
