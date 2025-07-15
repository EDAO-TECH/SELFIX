#!/usr/bin/env python3

import os
import time
import hashlib
import json
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from datetime import datetime

# Set base_dir dynamically based on this script's location
base_dir = os.path.dirname(os.path.abspath(__file__))

# Setup paths
SCAN_DIR = '/opt/SELFIX'
SIGNATURES_FILE = os.path.join(base_dir, 'data', 'signatures.json')
LOG_FILE = os.path.join(base_dir, 'logs', 'healing_daemon.log')

# Ensure logs directory exists
os.makedirs(os.path.dirname(LOG_FILE), exist_ok=True)

# Load known virus signatures (SHA-256 hashes)
def load_signatures():
    try:
        with open(SIGNATURES_FILE, 'r') as f:
            data = json.load(f)
            return data.get('signatures', [])
    except FileNotFoundError:
        log("⚠️ Signatures file not found. Continuing with an empty list.")
        return []

# Simple logger
def log(message):
    timestamp = datetime.now().isoformat()
    entry = f"[{timestamp}] {message}"
    print(entry)
    with open(LOG_FILE, 'a') as log_file:
        log_file.write(entry + '\n')

# Virus scanner function
def scan_directory(directory, signatures):
    log(f"🧭 Scanning directory: {directory}")
    threat_found = False

    for root, dirs, files in os.walk(directory):
        for name in files:
            path = os.path.join(root, name)
            try:
                with open(path, 'rb') as f:
                    file_hash = hashlib.sha256(f.read()).hexdigest()
                if file_hash in signatures:
                    log(f"⚠️ Threat detected: {path}")
                    threat_found = True
            except Exception as e:
                log(f"❌ Could not read {path}: {e}")

    if not threat_found:
        log("✅ No threats found.")

# Watchdog event handler
class ChangeHandler(FileSystemEventHandler):
    def on_modified(self, event):
        if not event.is_directory:
            log(f"✏️ Modified: {event.src_path}")
            scan_directory(SCAN_DIR, signatures)

    def on_created(self, event):
        if not event.is_directory:
            log(f"➕ Created: {event.src_path}")
            scan_directory(SCAN_DIR, signatures)

    def on_deleted(self, event):
        if not event.is_directory:
            log(f"❌ Deleted: {event.src_path}")
            scan_directory(SCAN_DIR, signatures)

if __name__ == '__main__':
    signatures = load_signatures()
    log(f"🛡️ Loaded {len(signatures)} virus signatures.")
    scan_directory(SCAN_DIR, signatures)

    # Start directory monitoring
    event_handler = ChangeHandler()
    observer = Observer()
    observer.schedule(event_handler, SCAN_DIR, recursive=True)
    observer.start()
    log("🔁 Healing daemon is monitoring file changes...")

    try:
        while True:
            time.sleep(10)
    except KeyboardInterrupt:
        log("🛑 Stopping healing daemon.")
        observer.stop()
    observer.join()
