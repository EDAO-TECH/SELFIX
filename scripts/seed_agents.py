#!/usr/bin/env python3
import json
import time
from pathlib import Path
from datetime import datetime
import subprocess

# Paths to important files
TASKS_FILE = Path("/opt/selfix_companion/inbox/tasks.json")
LOG_FILE = Path("/opt/selfix_companion/logs/delegate.log")

def log(msg):
    """Log messages with a timestamp."""
    timestamp = datetime.now().isoformat()
    entry = f"[{timestamp}] {msg}"
    print(entry)
    with open(LOG_FILE, "a") as f:
        f.write(entry + "\n")

def load_tasks():
    """Load new tasks from the inbox."""
    if not TASKS_FILE.exists():
        log("⚠️ No tasks found.")
        return []
    try:
        with open(TASKS_FILE, "r") as f:
            tasks = json.load(f)
        return [task for task in tasks if not task.get("done")]
    except json.JSONDecodeError:
        log("❌ Failed to load tasks.")
        return []

def delegate_task(task):
    """Delegate task to the Seeder or Healing module."""
    try:
        if "send_data" in task["task"]:
            subprocess.run(["python3", "/opt/selfix_companion/scripts/send_data.py"], check=True)
        elif "update_db" in task["task"]:
            subprocess.run(["python3", "/opt/selfix_companion/scripts/update_db.py"], check=True)
        log(f"✅ Task '{task['task']}' completed.")
    except subprocess.CalledProcessError as e:
        log(f"❌ Task '{task['task']}' failed: {e}")

def main():
    """Main loop to check tasks and delegate them."""
    while True:
        tasks = load_tasks()
        for task in tasks:
            if not task.get("done"):
                delegate_task(task)
                task["done"] = True
        time.sleep(10)  # Wait before checking again

if __name__ == "__main__":
    main()
