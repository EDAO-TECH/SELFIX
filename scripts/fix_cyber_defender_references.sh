#!/bin/bash

BASE_DIR="/opt/SELFIX"
OLD_PATH="/opt/SELFIX"
NEW_PATH="/opt/SELFIX"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo "[INFO] Starting automated migration at $TIMESTAMP"

# Step 1: Find and process all files containing the old path
FILES=$(grep -rl "$OLD_PATH" "$BASE_DIR")

echo "[INFO] Found $(echo "$FILES" | wc -l) file(s) containing legacy path."

for FILE in $FILES; do
    # Step 1a: Backup
    cp "$FILE" "$FILE.bak"
    echo "[BACKUP] $FILE -> $FILE.bak"

    # Step 2: Replace /opt/SELFIX with /opt/SELFIX
    sed -i "s|$OLD_PATH|$NEW_PATH|g" "$FILE"
    echo "[FIXED] Updated paths in $FILE"
done

# Step 3: Ensure all Python scripts import 'os' if needed
PYTHON_FILES=$(find "$BASE_DIR" -name "*.py")
echo "[INFO] Checking for missing 'import os' in Python files..."

for PYFILE in $PYTHON_FILES; do
    if grep -q "os\." "$PYFILE" && ! grep -q "^import os" "$PYFILE"; then
        sed -i '1s|^|import os\n|' "$PYFILE"
        echo "[UPDATED] Added 'import os' to $PYFILE"
    fi
done

echo "[✅ DONE] Migration completed. All changes backed up with .bak suffix."
