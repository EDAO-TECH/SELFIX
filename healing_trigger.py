#!/usr/bin/env python3
import time
from pathlib import Path

LOG_PATH = Path("/tmp/system_entropy.log")
THRESHOLD = 75  # Arbitrary entropy threshold
TRIGGER_FILE = Path("/tmp/trigger_healing.txt")

def read_entropy():
    if not LOG_PATH.exists():
        return 0
    try:
        with open(LOG_PATH) as f:
            line = f.readline()
            return int(line.strip())
    except:
        return 0

def main():
    while True:
        entropy = read_entropy()
        if entropy >= THRESHOLD:
            TRIGGER_FILE.write_text("triggered")
            print(f"🔥 Entropy threshold exceeded: {entropy}")
        time.sleep(10)

if __name__ == "__main__":
    main()
