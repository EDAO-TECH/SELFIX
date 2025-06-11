import os
import gzip
import hashlib
import json
import shutil
from datetime import datetime

PROMOTED_DIR = "healing_modules/promoted"
FIREWALL_DIR = "book_of_forgiveness/module_firewall"
MANIFEST_FILE = "book_of_forgiveness/book_manifest.json"
VAULT_FILE = "book_of_forgiveness/golden_vault.tar.gz"

def sha256sum(filepath):
    h = hashlib.sha256()
    with open(filepath, "rb") as f:
        while chunk := f.read(8192):
            h.update(chunk)
    return h.hexdigest()

def freeze_module(filename):
    src_path = os.path.join(PROMOTED_DIR, filename)
    if not os.path.isfile(src_path):
        print(f"[ERROR] File not found: {src_path}")
        return

    # Hash & compress
    hash_digest = sha256sum(src_path)
    gz_filename = filename + ".gz"
    gz_path = os.path.join(FIREWALL_DIR, gz_filename)

    with open(src_path, 'rb') as f_in:
        with gzip.open(gz_path, 'wb') as f_out:
            shutil.copyfileobj(f_in, f_out)

    # Append to manifest
    manifest_entry = {
        "module": filename,
        "hash": hash_digest,
        "verified_by": "qc_controller",
        "karma_score": 3,
        "target": "auto-detected",
        "version": "1.0.0",
        "timestamp": datetime.utcnow().isoformat() + "Z"
    }

    try:
        with open(MANIFEST_FILE, 'r') as f:
            manifest = json.load(f)
    except FileNotFoundError:
        manifest = []

    manifest.append(manifest_entry)
    with open(MANIFEST_FILE, 'w') as f:
        json.dump(manifest, f, indent=4)

    # Update the vault archive
    os.system(f"tar --append --file={VAULT_FILE} -C {FIREWALL_DIR} {gz_filename}")

    print(f"[✓] Module '{filename}' frozen and added to Book of Forgiveness.")

if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        print("Usage: python3 freeze_module.py <module.py>")
    else:
        freeze_module(sys.argv[1])
