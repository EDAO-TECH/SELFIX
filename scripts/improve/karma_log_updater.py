import json
import os
from datetime import datetime

manifest_path = "/opt/SELFIX/book_of_forgiveness/book_manifest.json"
karma_log = "/opt/SELFIX/data/karma_update_log.json"

with open(manifest_path, "r") as f:
    entries = json.load(f)

log = []
for item in entries:
    log.append({
        "filename": item["filename"],
        "karma": "verified",
        "timestamp": datetime.utcnow().isoformat() + "Z"
    })

with open(karma_log, "w") as f:
    json.dump(log, f, indent=4)

print("✅ Karma log updated.")
