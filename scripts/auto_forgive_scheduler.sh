#!/bin/bash
LOGFILE="/opt/SELFIX/logs/forgiveness_cycle.log"
echo "🕒 Running Selfix Forgiveness Cycle at $(date)" >> $LOGFILE

/opt/SELFIX/scripts/forgive_now.sh >> $LOGFILE 2>&1
/opt/SELFIX/scripts/qc/forgiveness_report.py >> $LOGFILE 2>&1
/opt/SELFIX/scripts/vault/cleanup_staging.py >> $LOGFILE 2>&1

echo "✅ Cycle complete" >> $LOGFILE
