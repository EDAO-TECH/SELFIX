#!/usr/bin/env python3
import json
from pathlib import Path
from datetime import datetime

ALERTS_DIR = Path("/opt/selfix_companion/root_alerts")
JOURNAL = Path("/opt/SELFIX/data/root_journal.json")

def load_alerts():
    return list(ALERTS_DIR.glob("*.json"))

def handle_alert(alert_file: Path):
    data = json.loads(alert_file.read_text())
    decision = "accept" if data.get("reason") != "karma_too_low" else "quarantine"
    log_entry = {
        "timestamp": datetime.now().isoformat(),
        "alert": data,
        "decision": decision
    }
    print(f"👑 Root AI decision: {decision} for module: {data.get('module')}")
    append_to_journal(log_entry)
    alert_file.unlink()

def append_to_journal(entry):
    if JOURNAL.exists():
        log = json.loads(JOURNAL.read_text())
    else:
        log = []
    log.append(entry)
    JOURNAL.write_text(json.dumps(log, indent=2))

def main():
    if not ALERTS_DIR.exists():
        ALERTS_DIR.mkdir(parents=True)
    for alert_file in load_alerts():
        handle_alert(alert_file)

if __name__ == "__main__":
    main()
