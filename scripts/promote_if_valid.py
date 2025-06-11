#!/usr/bin/env python3
import json
import shutil
from pathlib import Path
from datetime import datetime

SANDBOX_RESULTS = Path("/opt/SELFIX/data/sandbox_results.json")
PROMOTED_DIR = Path("/opt/SELFIX/healing_modules/promoted")
PROMOTED_LOG = Path("/opt/SELFIX/data/promoted_log.json")
IMPROVEMENTS_DIR = Path("/opt/SELFIX/improvements/modules")

SCORE_THRESHOLD = 90  # Minimum to auto-promote

def promote_modules():
    if not SANDBOX_RESULTS.exists():
        print("❌ No sandbox results to evaluate.")
        return

    with open(SANDBOX_RESULTS) as f:
        results = json.load(f)

    # Filter by score
    top_promotions = [r for r in results if r["score"] >= SCORE_THRESHOLD]

    # Load previous promotion log
    try:
        with open(PROMOTED_LOG) as f:
            history = json.load(f)
    except Exception:
        history = []

    for result in top_promotions:
        module_name = result["module"]
        src_path = IMPROVEMENTS_DIR / module_name
        dest_path = PROMOTED_DIR / module_name

        if not src_path.exists():
            continue  # Skip if file disappeared

        # Copy to promoted folder
        shutil.copy2(src_path, dest_path)

        # Add to log
        entry = {
            "module": module_name,
            "score": result["score"],
            "from_test": result["test_case"],
            "promoted_at": datetime.now().isoformat()
        }
        history.append(entry)
        print(f"✅ Promoted: {module_name} (score: {result['score']})")

    with open(PROMOTED_LOG, "w") as f:
        json.dump(history, f, indent=2)

    if not top_promotions:
        print("ℹ️ No modules passed the promotion threshold.")

if __name__ == "__main__":
    promote_modules()
