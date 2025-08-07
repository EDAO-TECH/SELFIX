#!/bin/bash

echo "🔧 Setting up SELFIX as a managed system service..."

SELFIX_DIR="/opt/SELFIX"
LOG_DIR="$SELFIX_DIR/logs"
HEALTH_CHECK="$SELFIX_DIR/selfix_health_check.py"
SERVICE_FILE="/etc/systemd/system/selfix.service"
CRON_JOB="0 0 * * * $HEALTH_CHECK"

# 1. Ensure log directory exists
mkdir -p "$LOG_DIR"
chmod 755 "$LOG_DIR"
echo "✅ Log directory ensured at $LOG_DIR"

# 2. Write systemd service file
cat <<EOF | sudo tee "$SERVICE_FILE" > /dev/null
[Unit]
Description=Start SELFIX Antivirus Service
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=$SELFIX_DIR
ExecStart=$SELFIX_DIR/selfix_smart_start.sh
Restart=on-failure
StandardOutput=append:$LOG_DIR/selfix_service.log
StandardError=append:$LOG_DIR/selfix_service.err

[Install]
WantedBy=multi-user.target
EOF

echo "✅ Created systemd unit at $SERVICE_FILE"

# 3. Create health checker script
cat <<EOF > "$HEALTH_CHECK"
#!/usr/bin/env python3
import subprocess
import datetime

log_path = "$LOG_DIR/health_check.log"
services = ["glance", "selfix-av"]

def log_status(service, status):
    now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(log_path, "a") as log:
        log.write(f"[{now}] {service}.service is {status}\\n")

def check_service(service):
    try:
        output = subprocess.check_output(["systemctl", "is-active", f"{service}.service"], text=True).strip()
        log_status(service, output)
    except subprocess.CalledProcessError:
        log_status(service, "not found or error")

if __name__ == "__main__":
    for svc in services:
        check_service(svc)
EOF

chmod +x "$HEALTH_CHECK"
echo "✅ Created health checker: $HEALTH_CHECK"

# 4. Enable and start systemd service
sudo systemctl daemon-reexec
sudo systemctl daemon-reload
sudo systemctl enable selfix.service
sudo systemctl start selfix.service
echo "✅ SELFIX service enabled and started"

# 5. Add daily cron job if not present
(crontab -l 2>/dev/null | grep -v "$HEALTH_CHECK" ; echo "$CRON_JOB") | crontab -
echo "✅ Daily health log scheduled via cron"

echo "🎉 SELFIX service setup is complete and running!"

