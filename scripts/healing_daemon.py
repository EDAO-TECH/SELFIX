import os
healing_daemon_code = '''#!/usr/bin/env python3

import time
import hashlib
import json
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from datetime import datetime
import subprocess

WATCH_PATHS = ["/home", "/etc", "/opt/SELFIX"]
ENTROPY_LOG = "/opt/SELFIX/logs/entropy_events.log"
DAEMON_LOG = "/opt/SELFIX/logs/daemon_log.json"


def hash_file(path):
    try:
        with open(path, "rb") as f:
            return hashlib.sha256(f.read()).hexdigest()
    except Exception:
        return None


class HealingTriggerHandler(FileSystemEventHandler):
    def on_modified(self, event):
        if event.is_directory:
            return

        filepath = event.src_path
        print(f"[!] Change detected: {filepath}")
        hash_val = hash_file(filepath)

        event_log = {
            "timestamp": datetime.utcnow().isoformat(),
            "file": filepath,
            "hash": hash_val,
            "action": "entropy_detected"
        }

        with open(ENTROPY_LOG, "a") as log:
            log.write(json.dumps(event_log) + "\\n")

        subprocess.run(["python3", "/opt/SELFIX/rollback_manager.py", filepath])
        # Here you would plug in healing_loop or broker
        print(f"[+] Healing initiated for {filepath} (simulated)")


def main():
    observer = Observer()
    handler = HealingTriggerHandler()

    for path in WATCH_PATHS:
        if os.path.exists(path):
            observer.schedule(handler, path, recursive=True)

    observer.start()
    print("Healing Daemon running... Monitoring for entropy.")
    try:
        while True:
            time.sleep(10)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()


if __name__ == "__main__":
    main()
'''

# Save healing_daemon.py
healing_daemon_path = os.path.join(base_dir, 'opt/cyber_defender/healing_daemon.py')
with open(healing_daemon_path, 'w') as f:
    f.write(healing_daemon_code)

healing_daemon_path
