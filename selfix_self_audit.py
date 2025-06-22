#!/usr/bin/env python3
import json
import os
from datetime import datetime
from pathlib import Path

LOG = Path("/opt/selfix_companion/logs/delegate.log")
REPORT = Path("/opt/SELFIX/healing_report.json")
STATUS = Path("/opt/SELFIX/data/system_status.json")
FAIL_SCORE = 0

def check_log_for(keyword):
    if not LOG.exists():
        return False
    return keyword.lower() in LOG.read_text().lower()

def load_json_file(path):
    try:
        return json.loads(path.read_text())
    except:
        return {}

def score_system():
    global FAIL_SCORE
    report = load_json_file(REPORT)
    if not report or not report.get("modules"):
        print("❌ No healing report found or empty.")
        FAIL_SCORE += 2

    if not check_log_for("rollback"):
        print("⚠️  No rollback activity detected. Good or untested?")
    if not check_log_for("karma"):
        print("⚠️  No karma changes logged.")

    status = load_json_file(STATUS)
    if status and not status.get("system_stable", True):
        print("❌ System reported as unstable.")
        FAIL_SCORE += 3

    if check_log_for("error") or check_log_for("traceback"):
        print("❌ Errors found in log.")
        FAIL_SCORE += 2

    print(f"\n📊 SELF-AUDIT SCORE: {'❌ ' if FAIL_SCORE else '✅ '} Risk Level: {FAIL_SCORE}/10")

if __name__ == "__main__":
    print(f"🧪 SELF-AUDIT started at {datetime.now().isoformat()}")
    score_system()
