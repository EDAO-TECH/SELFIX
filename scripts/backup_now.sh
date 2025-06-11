#!/bin/bash
STAMP=$(date +%Y%m%d-%H%M%S)
BACKUP_DIR="/opt/SELFIX/backups/selfix_backup_$STAMP"
mkdir -p "$BACKUP_DIR"
cp -r /opt/SELFIX/data "$BACKUP_DIR/"
cp -r /opt/SELFIX/logs "$BACKUP_DIR/"
cp -r /opt/SELFIX/book_of_forgiveness "$BACKUP_DIR/"
echo "[✓] Backup completed: $BACKUP_DIR"
