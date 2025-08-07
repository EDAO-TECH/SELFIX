#!/bin/bash

set -euo pipefail

echo "🔧 Initializing SELFIX as a managed system service..."

# === CONFIGURATION ===
SELFIX_DIR="/opt/SELFIX"
LOG_DIR="$SELFIX_DIR/logs"
HEALTH_CHECK="$SELFIX_DIR/selfix_health_check.py"
SERVICE_FILE="/etc/systemd/system/selfix.service"
CRON_JOB="0 0 * * * $HEALTH_CHECK"

# === 1. Ensure log directory exists ===
echo "📁 Ensuring log directory..."
sudo mkdir -p "$LOG_DIR"
sudo chmod 755 "$LOG_DIR"
echo "✅ Log directory ready at: $LOG_DIR"

# === 2. Create systemd service file ===
echo "🛠️  Writing systemd unit file..."
sudo tee "$SERVICE_FILE" > /dev/null <<EOF
[Unit]
Description=SELFIX Antivirus Service
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
echo "✅ systemd service written: $SERVICE_FILE"

# === 3. Create Python health checker ===
echo "🧪 Creating health check script..."
cat <<EOF | sudo tee "$HEALTH_CHECK" > /dev/null
#!/usr/bin/env python3
import subprocess
import datetime

log_path = "$LOG_DIR/health_check.log"
services = ["glance", "selfix-av"]

def log_status(service, status):
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(log_path, "a") as log:
        log.write(f"[{timestamp}] {service}.service is {status}\\n")

def check_service(service):
    try:
        status = subprocess.check_output(["systemctl", "is-active", f"{service}.service"], text=True).strip()
        log_status(service, status)
    except subprocess.CalledProcessError:
        log_status(service, "not found or error")

if __name__ == "__main__":
    for svc in services:
        check_service(svc)
EOF

sudo chmod +x "$HEALTH_CHECK"
echo "✅ Health check script created: $HEALTH_CHECK"

# === 4. Reload systemd and enable service ===
echo "🔄 Reloading systemd and enabling service..."
sudo systemctl daemon-reexec
sudo systemctl daemon-reload
sudo systemctl enable selfix.service
sudo systemctl restart selfix.service
echo "✅ SELFIX systemd service is enabled and running."

# === 5. Install daily cron job for health check ===
echo "📆 Installing daily cron health check..."
( crontab -l 2>/dev/null | grep -vF "$HEALTH_CHECK" || true; echo "$CRON_JOB" ) | crontab -
echo "✅ Cron job installed to run daily at midnight."

# === DONE ===
echo -e "\n🎉 SELFIX system service is successfully set up and monitored!\n"
