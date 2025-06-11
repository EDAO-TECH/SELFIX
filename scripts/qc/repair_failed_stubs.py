import os
import re

STAGING = "/opt/SELFIX/book_of_forgiveness/_staging/"
LOG_FILE = "/opt/SELFIX/logs/repair_stubs.log"

placeholder_code = '''# Selfix Auto-Repaired Placeholder
def main():
    print("🔧 Idea placeholder – awaiting implementation.")

if __name__ == "__main__":
    main()
'''

def needs_repair(content):
    return (
        len(content.strip()) == 0 or
        re.search(r'print\([\'"]🔧.*$', content) and not re.search(r'["\']\)', content)
    )

with open(LOG_FILE, "a") as log:
    for fname in os.listdir(STAGING):
        if not fname.endswith(".py"):
            continue

        path = os.path.join(STAGING, fname)
        try:
            with open(path, "r") as f:
                content = f.read()

            if needs_repair(content):
                with open(path, "w") as f:
                    f.write(placeholder_code)
                log.write(f"[FIXED] {fname}\n")
                print(f"[✅] Repaired: {fname}")
            else:
                print(f"[👌] OK: {fname}")
        except Exception as e:
            print(f"[⚠️] Error checking {fname}: {e}")
            log.write(f"[ERROR] {fname}: {e}\n")
