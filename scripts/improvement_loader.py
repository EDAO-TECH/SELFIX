#!/usr/bin/env python3
import os
import json
from pathlib import Path
from datetime import datetime

IMPROVEMENT_DIR = Path("/opt/SELFIX/improvements")
LOG_FILE = Path("/opt/SELFIX/data/ai_learning_log.json")

def scan_improvements():
    entries = []
    for root, _, files in os.walk(IMPROVEMENT_DIR):
        for name in files:
            file_path = Path(root) / name
            suggestion = {
                "filename": file_path.name,
                "path": str(file_path),
                "type": infer_type(file_path),
                "size_kb": round(file_path.stat().st_size / 1024, 2),
                "uploaded_at": datetime.now().isoformat()
            }
            entries.append(suggestion)
    return entries

def infer_type(file_path):
    ext = file_path.suffix
    if ext == ".md":
        return "idea"
    elif ext == ".py":
        return "module_draft"
    elif ext == ".json":
        return "test_case"
    return "unknown"

def log_suggestions(entries):
    LOG_FILE.parent.mkdir(parents=True, exist_ok=True)
    if LOG_FILE.exists():
        try:
            with open(LOG_FILE) as f:
                history = json.load(f)
        except json.JSONDecodeError:
            history = []
    else:
        history = []
    history.extend(entries)
    with open(LOG_FILE, "w") as f:
        json.dump(history, f, indent=2)

def main():
    entries = scan_improvements()
    log_suggestions(entries)
    print(f"🧠 Logged {len(entries)} improvement suggestions to {LOG_FILE}")

if __name__ == "__main__":
    main()
