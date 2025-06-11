import os
import shutil
from pathlib import Path

# Base directories
IDEAS_DIR = Path("/opt/SELFIX/improvements/ideas")
MODULES_DIR = Path("/opt/SELFIX/improvements/modules")

# Subfolders to create
IDEAS_SUBFOLDERS = ["completed", "ongoing", "backlog"]
MODULES_SUBFOLDERS = ["promoted", "in_testing", "deprecated"]

def ensure_subfolders(base_dir, subfolders):
    for folder in subfolders:
        (base_dir / folder).mkdir(parents=True, exist_ok=True)

def move_file(file_path, target_subdir):
    target_path = file_path.parent / target_subdir / file_path.name
    print(f"🔄 Moving {file_path} → {target_path}")
    shutil.move(str(file_path), str(target_path))

def organize_ideas():
    ensure_subfolders(IDEAS_DIR, IDEAS_SUBFOLDERS)
    for file in IDEAS_DIR.glob("*.md"):
        if "completed" in file.stem.lower():
            move_file(file, "completed")
        elif "status" in file.stem.lower() or "task" in file.stem.lower():
            move_file(file, "ongoing")
        else:
            move_file(file, "backlog")

def organize_modules():
    ensure_subfolders(MODULES_DIR, MODULES_SUBFOLDERS)
    for file in MODULES_DIR.glob("*.py"):
        if "promote" in file.stem.lower() or "golden" in file.stem.lower():
            move_file(file, "promoted")
        elif "fix" in file.stem.lower() or "sandbox" in file.stem.lower():
            move_file(file, "in_testing")
        else:
            move_file(file, "deprecated")

if __name__ == "__main__":
    organize_ideas()
    organize_modules()
