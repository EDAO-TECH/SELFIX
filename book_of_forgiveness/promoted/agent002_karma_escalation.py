# agent002_karma_escalation.py
import os
import json
from datetime import datetime

INBOX_DIR = "/opt/selfix_companion/inbox"
LOG_FILE = "/opt/selfix_companion/logs/agent002.log"

def log(message):
    os.makedirs(os.path.dirname(LOG_FILE), exist_ok=True)
    with open(LOG_FILE, "a") as f:
        f.write(f"{datetime.now().isoformat()} | {message}\n")

def monitor_and_escalate():
    # Simulated system status (can be extended)
    system_status_path = "/opt/SELFIX/data/system_status.json"

    if not os.path.exists(system_status_path):
        log("❌ No system status found.")
        return

    with open(system_status_path) as f:
        status = json.load(f)

    karma = status.get("karma_score", 0)
    healing_failures = status.get("healing_failures", 0)

    if healing_failures > 3 and karma < -3:
        task = {
            "type": "self-improvement",
            "trigger": "karma_drop",
            "assigned_to": "rep_ai",
            "suggested_fix": "retry_healing, alert_operator",
            "created_at": datetime.now().isoformat()
        }

        os.makedirs(INBOX_DIR, exist_ok=True)
        task_file = os.path.join(INBOX_DIR, f"agent002_task_{int(datetime.now().timestamp())}.json")
        with open(task_file, "w") as f:
            json.dump(task, f, indent=2)

        log(f"🚨 Escalated to HQ: {task_file}")
    else:
        log("✅ Karma within safe range.")

if __name__ == "__main__":
    monitor_and_escalate()
