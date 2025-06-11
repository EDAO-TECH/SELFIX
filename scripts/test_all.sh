# 🔹 STEP 0: Fix broken print strings in stubs
echo "
🔹 STEP 0: Repair unterminated strings in .py stubs"

/opt/SELFIX/scripts/repair_failed_stubs.py || echo "[⚠️] Repair script failed"

#!/bin/bash
set -e

MODE="manual"
if [ "$1" == "--auto" ]; then
    MODE="auto"
fi

log_step() {
    echo ""
    echo "🔹 STEP $1: $2"
    echo "------------------------------------------"
}

run_script() {
    log_step "$1" "$2"
    shift 2
    if [ "$MODE" == "manual" ]; then
        read -p "▶️ Press Enter to continue..."
    fi
    eval "$@"
}

run_script 1 "Repair broken stubs" \
    "python3 /opt/SELFIX/scripts/qc/repair_failed_stubs.py"

run_script 2 "Scan promoted modules into staging" \
    "python3 /opt/SELFIX/scripts/vault/scan_new_modules.py"

run_script 3 "Run quality checks" \
    "python3 /opt/SELFIX/scripts/qc/qc_test_module.py"

run_script 4 "Archive approved modules" \
    "python3 /opt/SELFIX/scripts/vault/archive_to_vault.py"

run_script 5 "Generate forgiveness report" \
    "python3 /opt/SELFIX/scripts/qc/forgiveness_report.py"

run_script 6 "Cleanup staging directory" \
    "python3 /opt/SELFIX/scripts/vault/cleanup_staging.py"

run_script 7 "Update karma status" \
    "python3 /opt/SELFIX/scripts/improve/karma_log_updater.py"

run_script 8 "Simulate upload to HQ" \
    "python3 /opt/SELFIX/scripts/seeder/upload_to_professor_ai.py"

echo ""
echo "🎉 ALL DONE — SELFIX SYSTEM FULLY OPERATIONAL"
