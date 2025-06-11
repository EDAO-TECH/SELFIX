import json
import os
import time
from datetime import datetime

# Paths to monitor
SYSTEM_STATUS_PATH = "/opt/SELFIX/data/system_status.json"
INBOX_PATH = "/opt/selfix_companion/inbox/"
LOG_PATH = "/opt/selfix_companion/logs/agent002.log"

# Threshold for karma score
KARMA_THRESHOLD = -3

# Function to read system status from JSON file
def read_system_status():
    with open(SYSTEM_STATUS_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

# Function to create a karma escalation task
def create_karma_escalation_task(karma_score, healing_failures):
    task = {
        "type": "self-improvement",
        "trigger": "karma_drop",
        "assigned_to": "rep_ai",
        "suggested_fix": "retry_healing, alert_operator",
        "created_at": datetime.utcnow().isoformat(),
        "karma_score": karma_score,
        "healing_failures": healing_failures
    }

    # Task filename based on timestamp
    task_filename = f"agent002_task_{int(time.time())}.json"
    task_path = os.path.join(INBOX_PATH, task_filename)

    # Write task to inbox
    with open(task_path, "w", encoding="utf-8") as f:
        json.dump(task, f, indent=4)

    print(f"Escalation task created: {task_filename}")
    return task_filename

# Function to monitor karma score and trigger escalation
def monitor_karma():
    while True:
        system_status = read_system_status()

        # Check karma score and healing failures
        karma_score = system_status.get("karma_score", 0)
        healing_failures = system_status.get("healing_failures", 0)

        print(f"Current Karma Score: {karma_score}, Healing Failures: {healing_failures}")

        if karma_score < KARMA_THRESHOLD:
            print("⚠️ Karma score below threshold, triggering escalation task...")
            create_karma_escalation_task(karma_score, healing_failures)

        # Wait for the next check
        time.sleep(60)  # Check every 60 seconds

if __name__ == "__main__":
    monitor_karma()
