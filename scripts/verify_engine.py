import os
import hashlib
import json
from datetime import datetime

WATCH_PATHS = ['/opt/SELFIX']
CRITICAL_FILES = [
    'yang_engine.py',
    'entropy_resolver.py',
    'healing_manager.py',
    'karma_guard.py'
]
LOG_PATH = '/opt/SELFIX/logs/verify_log.json'

def compute_sha256(file_path):
    with open(file_path, 'rb') as f:
        return hashlib.sha256(f.read()).hexdigest()

def verify_files():
    report = {
        "verified_on": datetime.utcnow().isoformat(),
        "results": []
    }

    for root, _, files in os.walk('/opt/SELFIX'):
        for file in files:
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, '/opt/SELFIX')
            status = {
                "file": rel_path,
                "exists": True,
                "hash": None,
                "critical": file in CRITICAL_FILES
            }

            try:
                status["hash"] = compute_sha256(full_path)
            except Exception as e:
                status["exists"] = False
                status["error"] = str(e)

            report["results"].append(status)

    os.makedirs(os.path.dirname(LOG_PATH), exist_ok=True)
    with open(LOG_PATH, 'w') as f:
        json.dump(report, f, indent=4)

    print(f"✅ Verification completed. Report saved to {LOG_PATH}")

if __name__ == "__main__":
    verify_files()
