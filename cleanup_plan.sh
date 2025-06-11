#!/bin/bash
set -e
LOGFILE="/opt/SELFIX/logs/cleanup_$(date +%Y%m%d_%H%M%S).log"
mkdir -p /opt/SELFIX/logs

log() {
  echo "[*] $1" | tee -a "$LOGFILE"
}

# Create structure
log "Creating target folders..."
mkdir -p /opt/SELFIX/{engine,scripts/qc,scripts/install,scripts/improve,scripts/seeder,scripts/vault,cli,docs/manuals,docs/legal,docs/_archive,vault,_archive}

# Remove __pycache__
if [ -d "__pycache__" ]; then
  log "Removing __pycache__..."
  rm -rf __pycache__
fi

# Move SELFIX docs
log "Moving SELFIX legal documents..."
mv SELFIX/*.pdf docs/legal/ 2>/dev/null || true
mv SELFIX/README.md docs/legal/ 2>/dev/null || true
mv SELFIX/test_sync.txt _archive/ 2>/dev/null || true
rmdir SELFIX 2>/dev/null || true

# Move generated but real files
log "Processing generated scripts..."
for file in golden_vault_manager.py healing_report.py healing_verifier.py karma_tester.py module_promoter.py rollback_manager.py sandbox_tester.py; do
  [ -f "generated/$file" ] && mv "generated/$file" scripts/qc/
done
rm -f generated/healing_loop.py generated/trap_logic.py generated/verify_engine.py
rmdir generated 2>/dev/null || true

# Move real core files
log "Organizing engine components..."
mv healing_loop.py healing_daemon.py healing_manager.py trap_logic.py verify_engine.py golden_vault_manager.py engine/

# Organize misc tools
mv entropy_resolver.py engine/
mv clean_script_filenames.py scripts/qc/
mv final_install_backup.sh scripts/install/
mv selfix_self_audit.py cli/

# Archive unused tarball
mv cyber_doc_bundle.tar.gz docs/_archive/

log "Cleanup complete."
