#!/usr/bin/env python3
import json
from pathlib import Path

def load_json(path):
    try:
        with open(path) as f:
            return json.load(f)
    except:
        return None

def print_section(title, data):
    print(f"\n🔹 {title}")
    print("──────────────────────────────")
    if not data:
        print("⚠️  No data found.")
        return
    if isinstance(data, list):
        print(f"Entries: {len(data)}")
        for entry in data[-3:]:
            print(f"  - {entry.get('script_name', entry.get('module', ''))}")
    elif isinstance(data, dict):
        for k, v in data.items():
            print(f"{k}: {v}")

def main():
    print("🛡️  Cyber Defender CLI Status")
    print("===================================")

    # Local AI
    ai_log = load_json("/opt/SELFIX/data/ai_learning_log.json")
    print_section("Local AI Improvements", ai_log)

    # Promotions
    promotions = load_json("/opt/SELFIX/data/promoted_log.json")
    print_section("Promoted Modules", promotions)

    # Seeder
    profile = load_json("/opt/SELFIX/data/commercial_profile.json")
    print_section("Commercial Profile", profile)

    # Targets
    targets_dir = Path("/opt/SELFIX/targets/")
    if targets_dir.exists():
        targets = [p.name for p in targets_dir.iterdir() if p.is_dir()]
        print_section("Active Targets", {"count": len(targets), "names": targets})
    else:
        print_section("Active Targets", None)

if __name__ == "__main__":
    main()
