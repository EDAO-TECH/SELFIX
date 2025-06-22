import os
import json
import requests
import hashlib
from datetime import datetime, timedelta

SIGNATURE_FILE = "antivirus/selfix_signatures.json"
SIGNATURE_URL = "https://raw.githubusercontent.com/EDAO-TECH/SELFIX/main/antivirus/selfix_signatures.json"
LAST_UPDATED_FILE = "antivirus/last_updated.txt"
UPDATE_INTERVAL_HOURS = 6
SCAN_PATH = "/opt/SELFIX"  # You can also make this configurable

def log(msg):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{timestamp}] {msg}")

def should_update():
    if not os.path.exists(LAST_UPDATED_FILE):
        return True
    try:
        with open(LAST_UPDATED_FILE, 'r') as f:
            last_updated = datetime.fromisoformat(f.read().strip())
        return datetime.now() - last_updated > timedelta(hours=UPDATE_INTERVAL_HOURS)
    except Exception:
        return True

def update_signatures():
    if not should_update():
        log("🔁 Signature update not required.")
        return
    try:
        log("🌐 Fetching latest signatures from GitHub...")
        response = requests.get(SIGNATURE_URL, timeout=10)
        response.raise_for_status()
        data = response.json()
        with open(SIGNATURE_FILE, 'w') as f:
            json.dump(data, f, indent=4)
        with open(LAST_UPDATED_FILE, 'w') as f:
            f.write(datetime.now().isoformat())
        log("✅ Signature file updated.")
    except Exception as e:
        log(f"❌ Error downloading signatures: {e}")

def load_signatures():
    if not os.path.exists(SIGNATURE_FILE):
        return []
    with open(SIGNATURE_FILE, 'r') as f:
        return json.load(f)

def compute_sha256(filepath):
    sha256 = hashlib.sha256()
    try:
        with open(filepath, 'rb') as f:
            while chunk := f.read(8192):
                sha256.update(chunk)
        return sha256.hexdigest()
    except Exception as e:
        log(f"⚠️ Error reading file: {filepath} — {e}")
        return None

def scan_path(path, signatures):
    found = []
    known_hashes = {sig["sha256"]: sig for sig in signatures}
    log(f"🧭 Starting scan in: {path}")
    for root, _, files in os.walk(path):
        for file in files:
            full_path = os.path.join(root, file)
            file_hash = compute_sha256(full_path)
            if file_hash and file_hash in known_hashes:
                sig = known_hashes[file_hash]
                detection = {
                    "file": full_path,
                    "threat": sig["name"],
                    "description": sig.get("description", ""),
                    "hash": file_hash,
                    "detected_on": datetime.now().isoformat()
                }
                found.append(detection)
                log(f"🚨 MALWARE DETECTED: {file} → {sig['name']}")
    return found

def save_report(detections):
    if not detections:
        log("✅ No threats found.")
        return
    os.makedirs("logs", exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    log_file = f"logs/scan_report_{timestamp}.json"
    with open(log_file, 'w') as f:
        json.dump(detections, f, indent=4)
    log(f"📄 Report saved: {log_file}")

def main():
    update_signatures()
    signatures = load_signatures()
    log(f"🛡️ Loaded {len(signatures)} virus signatures.")
    detections = scan_path(SCAN_PATH, signatures)
    save_report(detections)

if __name__ == "__main__":
    main()
