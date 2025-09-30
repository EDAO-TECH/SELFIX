#!/usr/bin/env bash
#
# cleanup_selfix.sh - remove Python build artefacts and temporary agent folders.
#
# Usage:
#   ./scripts/cleanup_selfix.sh           # perform cleanup
#   ./scripts/cleanup_selfix.sh --dry-run # preview actions without deleting files
#
set -euo pipefail

DRY_RUN=false
if [[ "${1:-}" == "--dry-run" ]]; then
  DRY_RUN=true
fi

ROOT_DIR="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$ROOT_DIR"

mapfile -t PY_CACHE_DIRS < <(find . -type d -name '__pycache__')
mapfile -t PYC_FILES < <(find . -type f -name '*.py[co]')
mapfile -t TEMP_AGENT_DIRS < <(find . -type d -name 'agents_tmp')

remove_item() {
  local path="$1"
  if [[ $DRY_RUN == true ]]; then
    printf '[dry-run] would remove %s\n' "$path"
  else
    if [[ -d $path ]]; then
      rm -rf "$path"
      printf 'removed directory %s\n' "$path"
    elif [[ -f $path ]]; then
      rm -f "$path"
      printf 'removed file %s\n' "$path"
    fi
  fi
}

for path in "${PY_CACHE_DIRS[@]}"; do
  remove_item "$path"
done

for path in "${PYC_FILES[@]}"; do
  remove_item "$path"
done

for path in "${TEMP_AGENT_DIRS[@]}"; do
  remove_item "$path"
done

printf '\nCleanup complete. %d cache directories, %d compiled files, %d temporary agent folders processed.\n' \
  "${#PY_CACHE_DIRS[@]}" "${#PYC_FILES[@]}" "${#TEMP_AGENT_DIRS[@]}"
