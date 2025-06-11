#!/bin/bash
set -e

echo "📜 [1/3] Scanning new modules into forgiveness staging..."
python3 /opt/SELFIX/scripts/vault/scan_new_modules.py

echo "🧪 [2/3] Running quality checks on staged modules..."
python3 /opt/SELFIX/scripts/qc/qc_test_module.py

echo "📦 [3/3] Archiving approved modules into Book of Forgiveness..."
python3 /opt/SELFIX/scripts/vault/archive_to_vault.py

echo "✅ Forgiveness cycle complete."
