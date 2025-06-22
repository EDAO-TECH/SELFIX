import os

# Recreate necessary folder structure and regenerate cd_status.py due to kernel reset
base_path = "/mnt/data/cyber_defender_final/scripts"
os.makedirs(base_path, exist_ok=True)

cd_status_py = """import json
import os
import time
from datetime import datetime

AI_STATUS_FILE = "/opt/SELFIX/data/ai_status.json"
AGENT_LOG_FILE = "/opt/SELFIX/logs/watchdog_report.json"

def load_json(path):
    try:
        with open(path, "r") as f:
            return json.load(f)
    except Exception as e:
        return {"error": str(e)}

def format_status():
    ai_data = load_json(AI_STATUS_FILE)
    agent_data = load_json(AGENT_LOG_FILE)

    print("\\n🛡️  Cyber Defender Engine Status")
    print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

    if "error" in ai_data:
        print(f"⚠️  AI status error: {ai_data['error']}")
    else:
        print(f"🤖 AI Engine: {ai_data.get('ai_status', 'unknown')} (last updated: {ai_data.get('last_updated', 'N/A')})")

    if "error" in agent_data:
        print(f"⚠️  Watchdog log error: {agent_data['error']}")
    else:
        print("\\n📡 Healing Engine Heartbeats:")
        for entry in agent_data.get("status", []):
            last_ping = entry.get("last_ping", 0)
            age = round(time.time() - last_ping)
            status_icon = "✅" if entry.get("status") == "alive" else "⚠️"
            print(f"{status_icon} {entry['engine']:<18} - Last ping: {age} sec ago")

if __name__ == "__main__":
    format_status()
"""

status_script_path = os.path.join(base_path, "cd_status.py")
with open(status_script_path, "w") as f:
    f.write(cd_status_py)

status_script_path
