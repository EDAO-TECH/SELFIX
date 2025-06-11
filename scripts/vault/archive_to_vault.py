import os
import json
import gzip
from datetime import datetime

STAGING = "/opt/SELFIX/book_of_forgiveness/_staging/"
VAULT = "/opt/SELFIX/book_of_forgiveness/module_firewall/"
MANIFEST = "/opt/SELFIX/book_of_forgiveness/book_manifest.json"

os.makedirs(VAULT, exist_ok=True)
manifest_data = []

if os.path.exists(MANIFEST):
    with open(MANIFEST, "r") as f:
        try:
            loaded = json.load(f)
            if isinstance(loaded, list):
                manifest_data = loaded
            else:
                manifest_data = [loaded]  # fallback
        except json.JSONDecodeError:
            print("⚠️ Manifest corrupted or empty, starting fresh.")

for file in os.listdir(STAGING):
    if file.endswith(".py"):
        source_path = os.path.join(STAGING, file)
        target_path = os.path.join(VAULT, file + ".gz")

        print(f"[📦] Archiving: {file}")
        with open(source_path, 'rb') as f_in, gzip.open(target_path, 'wb') as f_out:
            f_out.writelines(f_in)

        manifest_data.append({
            "filename": file,
            "compressed": file + ".gz",
            "date": datetime.utcnow().isoformat() + "Z",
            "karma": "verified"
        })

with open(MANIFEST, "w") as f:
    json.dump(manifest_data, f, indent=4)

print("[✅] Manifest updated.")
