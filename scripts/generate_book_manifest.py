import os
import hashlib
import json
from pathlib import Path
from datetime import datetime

MODULE_DIR = Path("/opt/SELFIX/book_of_forgiveness/module_firewall")
MANIFEST_PATH = Path("/opt/SELFIX/book_of_forgiveness/book_manifest.json")

def hash_file(file_path):
    sha256 = hashlib.sha256()
    with open(file_path, "rb") as f:
        while chunk := f.read(8192):
            sha256.update(chunk)
    return sha256.hexdigest()

def generate_manifest():
    manifest = {
        "generated_on": datetime.utcnow().isoformat() + "Z",
        "modules": []
    }

    for file in MODULE_DIR.glob("*.py.gz"):
        stat = file.stat()
        entry = {
            "filename": file.name,
            "sha256": hash_file(file),
            "modified": datetime.utcfromtimestamp(stat.st_mtime).isoformat() + "Z",
            "size_bytes": stat.st_size
        }
        manifest["modules"].append(entry)

    MANIFEST_PATH.write_text(json.dumps(manifest, indent=2))
    print(f"✅ Book manifest updated: {MANIFEST_PATH}")

if __name__ == "__main__":
    generate_manifest()
