#!/bin/bash
LATEST=$(ls -td /opt/SELFIX/backups/selfix_backup_* | head -1)
if [ -d "$LATEST" ]; then
    cp -r "$LATEST/data" /opt/SELFIX/
    cp -r "$LATEST/logs" /opt/SELFIX/
    cp -r "$LATEST/book_of_forgiveness" /opt/SELFIX/
    echo "[✓] Restore completed from $LATEST"
else
    echo "[!] No backups found."
fi
