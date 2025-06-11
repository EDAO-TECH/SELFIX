import os
from datetime import datetime

LOG_PATH = "/opt/SELFIX/logs/forgiveness_history/"
os.makedirs(LOG_PATH, exist_ok=True)

files = os.listdir("/opt/SELFIX/book_of_forgiveness/module_firewall/")
count = len([f for f in files if f.endswith(".gz")])

now = datetime.utcnow().strftime("%Y-%m-%d_%H-%M")
with open(f"{LOG_PATH}forgiveness_report_{now}.txt", "w") as f:
    f.write(f"🕊️ Selfix Forgiveness Report — {now}\n")
    f.write(f"Modules archived: {count}\n\n")
    for name in files:
        if name.endswith(".gz"):
            f.write(f"✅ {name}\n")
