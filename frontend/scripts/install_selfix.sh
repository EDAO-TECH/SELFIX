#!/bin/bash

set -euo pipefail

echo "🚀 Starting SELFIX Unified Setup Script..."

# === VARIABLES ===
SELFIX_DIR="/opt/SELFIX"
LOG_DIR="$SELFIX_DIR/logs"
SERVICE_NAME="selfix"
SERVICE_FILE="/etc/systemd/system/$SERVICE_NAME.service"
HEALTH_CHECK_SCRIPT="$SELFIX_DIR/selfix_health_check.py"
START_SCRIPT="$SELFIX_DIR/selfix_smart_start.sh"
CRON_JOB="0 0 * * * $HEALTH_CHECK_SCRIPT"
DEPENDENCIES=(python3 systemctl)

# === 0. Check Dependencies ===
echo "🔍 Checking required tools..."
for cmd in "${DEPENDENCIES[@]}"; do
  if ! command -v "$cmd" &> /dev/null; then
    echo "❌ Error: '$cmd' is not installed. Please install it first."
    exit 1
  fi
done
echo "✅ All dependencies are available."

# === 1. Setup SELFIX directory and logs ===
echo "📁 Creating SELFIX directory and logs at $SELFIX_DIR"
sudo mkdir -p "$LOG_DIR"
sudo chmod 755 "$LOG_DIR"

# === 2. Create systemd service file ===
echo "🛠️  Writing $SERVICE_FILE"
sudo tee "$SERVICE_FILE" > /dev/null <<EOF
[Unit]
Description=SELFIX Antivirus Background Service
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=$SELFIX_DIR
ExecStart=$START_SCRIPT
Restart=on-failure
StandardOutput=append:$LOG_DIR/selfix_service.log
StandardError=append:$LOG_DIR/selfix_service.err

[Install]
WantedBy=multi-user.target
EOF
echo "✅ Systemd service configured."

# === 3. Create the health check Python script ===
echo "🧪 Creating Python health checker..."
sudo tee "$HEALTH_CHECK_SCRIPT" > /dev/null <<EOF
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
        result = subprocess.check_output(["systemctl", "is-active", f"{service}.service"], text=True).strip()
        log_status(service, result)
    except subprocess.CalledProcessError:
        log_status(service, "inactive or not found")

if __name__ == "__main__":
    for svc in services:
        check_service(svc)
EOF

sudo chmod +x "$HEALTH_CHECK_SCRIPT"
echo "✅ Health checker created at $HEALTH_CHECK_SCRIPT"

# === 4. Enable and start the systemd service ===
echo "🔄 Reloading systemd & starting SELFIX service..."
sudo systemctl daemon-reexec
sudo systemctl daemon-reload
sudo systemctl enable "$SERVICE_NAME"
sudo systemctl restart "$SERVICE_NAME"
echo "✅ $SERVICE_NAME service is running."

# === 5. Add a cron job for daily health checks ===
echo "📆 Installing daily cron job..."
(crontab -l 2>/dev/null | grep -vF "$HEALTH_CHECK_SCRIPT" || true; echo "$CRON_JOB") | crontab -
echo "✅ Cron job added for health monitoring."

# === DONE ===
echo -e "\n🎉 SELFIX is fully installed, running as a service, and monitored daily!"
echo "🔎 Log files at: $LOG_DIR"
echo "🩺 Daily health checks via: $HEALTH_CHECK_SCRIPT"
