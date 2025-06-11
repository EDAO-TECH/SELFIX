#!/usr/bin/env python3
import argparse
import json
import platform
import uuid
from pathlib import Path
from datetime import datetime

def main():
    parser = argparse.ArgumentParser(description="Tag this system for commercial deployment")
    parser.add_argument("--customer", required=True, help="Customer or organization name")
    parser.add_argument("--contact_email", required=False, help="Optional email for support contact")
    args = parser.parse_args()

    profile = {
        "customer": args.customer,
        "contact_email": args.contact_email or "not_provided",
        "system_id": str(uuid.uuid4()),
        "install_time": datetime.now().isoformat(),
        "os": platform.system(),
        "release": platform.release(),
        "version": platform.version(),
        "machine": platform.machine(),
        "node": platform.node()
    }

    save_path = Path("/opt/SELFIX/data/commercial_profile.json")
    save_path.parent.mkdir(parents=True, exist_ok=True)
    with open(save_path, "w") as f:
        json.dump(profile, f, indent=2)

    print("✅ Commercial profile saved to", save_path)

if __name__ == "__main__":
    main()
