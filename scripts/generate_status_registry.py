import os
import yaml
from pathlib import Path

# Configurable directories
IDEAS_DIR = Path("/opt/SELFIX/improvements/ideas")
MODULES_DIR = Path("/opt/SELFIX/improvements/modules")
OUTPUT_FILE = Path("/opt/SELFIX/data/status_registry.yaml")

def collect_statuses(base_path, subdirs):
    status_map = {}
    for status in subdirs:
        folder = base_path / status
        if not folder.exists():
            continue
        for file in folder.glob("*.py"):
            status_map[file.stem] = status
    return status_map

def main():
    ideas_status = collect_statuses(IDEAS_DIR, ["completed", "ongoing", "backlog"])
    modules_status = collect_statuses(MODULES_DIR, ["promoted", "in_testing", "deprecated"])

    registry = {
        "ideas": ideas_status,
        "modules": modules_status,
    }

    with open(OUTPUT_FILE, "w") as f:
        yaml.dump(registry, f, sort_keys=True)

    print(f"✅ Status registry written to: {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
