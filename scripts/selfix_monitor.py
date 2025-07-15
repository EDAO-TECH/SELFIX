import subprocess
import time
import os
import logging
from datetime import datetime

MONITOR_INTERVAL = 15  # seconds
MONITORED_SERVICES = {
    "healing_daemon.py": "python3 healing_daemon.py",
    "selfix_scanner.py": "python3 antivirus/selfix_scanner.py"
}

LOG_PATH = "logs/monitor.log"
os.makedirs("logs", exist_ok=True)

logging.basicConfig(
    filename=LOG_PATH,
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

def is_running(process_name):
    try:
        output = subprocess.check_output(["pgrep", "-f", process_name])
        return bool(output.strip())
    except subprocess.CalledProcessError:
        return False

def start_process(cmd):
    subprocess.Popen(cmd, shell=True)
    logging.info(f"Restarted: {cmd}")

if __name__ == "__main__":
    logging.info("SELFIX Monitor Started")
    while True:
        for name, command in MONITORED_SERVICES.items():
            if not is_running(name):
                logging.warning(f"{name} not running. Restarting...")
                start_process(command)
        time.sleep(MONITOR_INTERVAL)
