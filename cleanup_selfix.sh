#!/usr/bin/env bash
set -euo pipefail

# cleanup_selfix.sh - Remove transient Python build artifacts and temporary agent caches.

print_usage() {
  cat <<'EOF'
Usage: ./cleanup_selfix.sh [options] [target-directory]

Options:
  -n, --dry-run   List matching files without deleting them
  -h, --help      Show this help text and exit

When no directory is provided the script operates on the repository root.
EOF
}

DRY_RUN=0
TARGET_DIR=""

while (($#)); do
  case "$1" in
    -n|--dry-run)
      DRY_RUN=1
      shift
      ;;
    -h|--help)
      print_usage
      exit 0
      ;;
    --)
      shift
      break
      ;;
    -*)
      echo "[ERROR] Unknown option: $1" >&2
      print_usage >&2
      exit 1
      ;;
    *)
      if [[ -n "${TARGET_DIR}" ]]; then
        echo "[ERROR] Multiple target directories provided." >&2
        print_usage >&2
        exit 1
      fi
      TARGET_DIR="$1"
      shift
      ;;
  esac
done

if [[ $# -gt 0 ]]; then
  echo "[ERROR] Unexpected arguments: $*" >&2
  print_usage >&2
  exit 1
fi

if [[ -z "${TARGET_DIR}" ]]; then
  TARGET_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
fi

if ! TARGET_DIR="$(cd "${TARGET_DIR}" 2>/dev/null && pwd)"; then
  echo "[ERROR] Target directory not found: ${TARGET_DIR}" >&2
  exit 1
fi

if [[ "${TARGET_DIR}" == "/" ]]; then
  echo "[ERROR] Refusing to operate on the filesystem root." >&2
  exit 1
fi

printf '[INFO] Cleaning workspace: %s\n' "${TARGET_DIR}"

if ((DRY_RUN)); then
  echo '[INFO] Running in dry-run mode. No files will be deleted.'
fi

cleanup_matches() {
  local description="$1"
  local removal_mode="$2"
  shift 2

  local removed=0
  while IFS= read -r -d '' path; do
    ((removed++))
    if ((DRY_RUN)); then
      printf '[DRY] %s\n' "${path}"
    else
      printf '[DELETE] %s\n' "${path}"
      case "${removal_mode}" in
        file)
          rm -f -- "${path}"
          ;;
        dir)
          rm -rf -- "${path}"
          ;;
        *)
          echo "[WARN] Unknown removal mode: ${removal_mode}" >&2
          ;;
      esac
    fi
  done < <(find "${TARGET_DIR}" "$@" -print0)

  if ((removed == 0)); then
    printf '[SKIP] No %s found.%s\n' "${description}" "$( ((DRY_RUN)) && printf ' (dry run)')"
  fi
}

cleanup_matches "__pycache__ directories" dir -type d -name '__pycache__'
cleanup_matches "compiled Python files" file -type f \( -name '*.pyc' -o -name '*.pyo' \)
cleanup_matches "agent temp directories" dir -type d \( -name 'agents_tmp' -o -name '.agents_tmp' \)

echo '[INFO] Cleanup completed successfully.'
