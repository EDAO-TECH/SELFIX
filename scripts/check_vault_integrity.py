#!/usr/bin/env python3
import json
import hashlib
from pathlib import Path

MANIFEST_PATH = Path("/opt/SELFIX/book_of_forgiveness/book_manifest.json")
FIREWALL_DIR = Path("/opt/SELFIX/book_of_forgiveness/module_firewall")

def sha256sum(filepath):
    h = hashlib.sha256()
    with open(filepath, "rb") as f:
        while chunk := f.read(8192):
            h.update(chunk)
    return h.hexdigest()

def load_manifest():
    if not MANIFEST_PATH.exists():
        print("❌ Manifest not found.")
        return []
    with open(MANIFEST_PATH) as f:
        return json.load(f)

def verify_modules():
    manifest = load_manifest()
    all_ok = True
    checked = set()

    for entry in manifest:
        fname = entry["module"] + ".gz"
        expected_hash = entry["hash"]
        path = FIREWALL_DIR / fname
        checked.add(fname)

        if not path.exists():
            print(f"❌ Missing file: {fname}")
            all_ok = False
            continue

        actual_hash = sha256sum(path)
        if actual_hash != expected_hash:
            print(f"⚠️  Hash mismatch: {fname}")
            print(f"    Expected: {expected_hash}")
            print(f"    Actual:   {actual_hash}")
            all_ok = False
        else:
            print(f"✅ Verified: {fname}")

    # Check for rogue files
    for file in FIREWALL_DIR.glob("*.py.gz"):
        if file.name not in checked:
            print(f"❌ Untracked file in firewall: {file.name}")
            all_ok = False

    if all_ok:
        print("\n✅ Vault integrity: PASS")
    else:
        print("\n❌ Vault integrity: FAIL")

if __name__ == "__main__":
    verify_modules()
