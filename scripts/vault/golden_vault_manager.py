import os
import gzip
import shutil
import json
from datetime import datetime

PROMOTED_DIR = "/opt/SELFIX/healing_modules/promoted"
VAULT_DIR = "/opt/SELFIX/book_of_forgiveness/module_firewall"
MANIFEST_PATH = "/opt/SELFIX/book_of_forgiveness/book_manifest.json"

def compress_script(src_path, dst_path):
    with open(src_path, 'rb') as f_in:
        with gzip.open(dst_path, 'wb') as f_out:
            shutil.copyfileobj(f_in, f_out)

def create_manifest_entry(filename):
    return {
        "original": filename,
        "compressed": f"{filename}.gz",
        "timestamp": datetime.utcnow().isoformat()
    }

def main():
    os.makedirs(VAULT_DIR, exist_ok=True)
    manifest = []

    for file in os.listdir(PROMOTED_DIR):
        if file.endswith(".py"):
            src = os.path.join(PROMOTED_DIR, file)
            dst = os.path.join(VAULT_DIR, file + ".gz")
            compress_script(src, dst)
            manifest.append(create_manifest_entry(file))

    with open(MANIFEST_PATH, "w") as f:
        json.dump(manifest, f, indent=2)

    print(f"✅ Vault created with {len(manifest)} entries.")
    print(f"📜 Manifest saved to: {MANIFEST_PATH}")

if __name__ == "__main__":
    main()
