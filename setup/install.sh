#!/bin/bash

echo "📦 SELFIX Installation Started..."

INSTALL_DIR="/opt/SELFIX"
LOG_FILE="/var/log/selfix_install.log"
SERVICE_FILE="/etc/systemd/system/selfix.service"

echo "🔍 Pre-check: Verifying environment..." | tee -a $LOG_FILE

# Ensure script is run as root
if [[ $EUID -ne 0 ]]; then
   echo "❌ This script must be run as root" | tee -a $LOG_FILE
   exit 1
fi

# Check if required file exists
if [ ! -f "$INSTALL_DIR/local_ai.py" ]; then
  echo "❌ Missing main execution file: local_ai.py" | tee -a $LOG_FILE
  exit 1
fi

# Set permissions
chmod -R 755 "$INSTALL_DIR"
chown -R root:root "$INSTALL_DIR"

# Create systemd service
cat <<EOF > "$SERVICE_FILE"
[Unit]
Description=SELFIX Healing Daemon
After=network.target

[Service]
ExecStart=/usr/bin/python3 $INSTALL_DIR/local_ai.py
Restart=always
User=root
WorkingDirectory=$INSTALL_DIR

[Install]
WantedBy=multi-user.target
EOF

# Enable and start the service
systemctl daemon-reexec
systemctl daemon-reload
systemctl enable selfix.service
systemctl restart selfix.service

echo "✅ SELFIX installed and service started." | tee -a $LOG_FILE
