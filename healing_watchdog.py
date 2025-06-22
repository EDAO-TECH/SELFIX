#!/usr/bin/env python3

import os
import time
import json
from datetime import datetime

ENGINES = [
    "yang_engine", "trap_logic", "soul_core",
    "healing_manager", "entropy_resolver", "karma_guard"
]

HEARTBEAT_FILE = "/opt/SELFIX/data/agent_heartbeat.json"
WATCHDOG_LOG = "/opt/SELFIX/logs/watchdog_report.json"
TIMEOUT_SECONDS = 60

def load_heartbeats():
    if not os.path.exists(HEARTBEAT_FILE):
        return {}
    with open(HEARTBEAT_FILE) as f:
        return json.load(f)

def check_engines(heartbeats):
    now = time.time()
    report = {}
    for engine in ENGINES:
        last_ping = heartbeats.get(engine, 0)
        delta = now - last_ping
        status = "asleep" if delta > TIMEOUT_SECONDS else "ok"
        report[engine] = {
            "last_ping": datetime.utcfromtimestamp(last_ping).isoformat() if last_ping else "never",
            "status": status
        }
    return report

def main():
    while True:
        heartbeats = load_heartbeats()
        status_report = check_engines(heartbeats)

        os.makedirs(os.path.dirname(WATCHDOG_LOG), exist_ok=True)
        with open(WATCHDOG_LOG, "w") as f:
            json.dump(status_report, f, indent=2)

        for engine, report in status_report.items():
            if report["status"] == "asleep":
                print(f"[!] {engine} is asleep. Consider restarting or investigating.")

        time.sleep(30)

if __name__ == "__main__":
    main()
