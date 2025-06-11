#!/usr/bin/env python3
import os

TARGET_DIRS = [
    "/opt/SELFIX/book_of_forgiveness/vault",
    "/opt/SELFIX/book_of_forgiveness/_staging"
]

def fix_print_statements(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    updated_lines = []
    for line in lines:
        stripped = line.strip()
        if stripped.startswith('print("') and not stripped.endswith('")'):
            line = line.rstrip('\n') + '")\n'
        updated_lines.append(line)

    with open(file_path, "w", encoding="utf-8") as f:
        f.writelines(updated_lines)

    print(f"[🔧] Repaired: {os.path.basename(file_path)}")

def ensure_directories():
    for directory in TARGET_DIRS:
        if not os.path.exists(directory):
            os.makedirs(directory)
            print(f"[📁] Created missing folder: {directory}")

def main():
    ensure_directories()
    for directory in TARGET_DIRS:
        py_files = [f for f in os.listdir(directory) if f.endswith(".py")]
        if not py_files:
            print(f"[ℹ️] No Python files in: {directory}")
            continue

        for filename in py_files:
            file_path = os.path.join(directory, filename)
            fix_print_statements(file_path)

if __name__ == "__main__":
    main()
