from pathlib import Path
import json
import platform
import psutil
import shutil
import datetime

# Prepare the paths
script_path = Path("/mnt/data/cyber_healthcheck.py")
report_path = Path("/mnt/data/system_health_report.json")

# Create the script content
script_content = f"""#!/usr/bin/env python3
import json
import platform
import psutil
import shutil
import datetime
from pathlib import Path

def check_disk_usage():
    disk = shutil.disk_usage("/")
    percent_used = disk.used / disk.total * 100
    return {{
        "total_gb": round(disk.total / (1024**3), 2),
        "used_percent": round(percent_used, 2),
        "status": "warning" if percent_used > 90 else "ok"
    }}

def check_memory():
    mem = psutil.virtual_memory()
    swap = psutil.swap_memory()
    return {{
        "ram_percent_used": mem.percent,
        "swap_percent_used": swap.percent,
        "status": "warning" if mem.percent > 90 or swap.percent > 50 else "ok"
    }}

def check_processes():
    suspicious_keywords = ["miner", "hack", "suspicious"]
    found = []
    for proc in psutil.process_iter(['pid', 'name']):
        try:
            if any(kw in proc.info['name'].lower() for kw in suspicious_keywords):
                found.append(proc.info)
        except (psutil.NoSuchProcess, psutil.AccessDenied):
            continue
    return found

def print_summary(report):
    print("\\n🛡️  Cyber Defender System Health Check")
    print("=======================================")
    print(f"🔹 OS: {{report['system']['os']}} {{report['system']['release']}}")
    print(f"🔹 Hostname: {{report['system']['hostname']}}")
    print(f"💽 Disk: {{report['disk']['used_percent']}}% used → {{report['disk']['status'].upper()}}")
    print(f"🧠 Memory: {{report['memory']['ram_percent_used']}}% RAM, {{report['memory']['swap_percent_used']}}% Swap → {{report['memory']['status'].upper()}}")
    if report['suspicious_processes']:
        print("⚠️  Suspicious processes found:")
        for proc in report['suspicious_processes']:
            print(f"  - PID {{proc['pid']}}: {{proc['name']}}")
    else:
        print("✅ No suspicious processes found.")
    print("\\n📋 Recommendation: " + report['summary']['recommendation'])
    print(f"📁 Report saved to: {report_path}")

def main():
    report = {{
        "system": {{
            "os": platform.system(),
            "release": platform.release(),
            "version": platform.version(),
            "hostname": platform.node(),
            "checked_at": datetime.datetime.now().isoformat()
        }},
        "disk": check_disk_usage(),
        "memory": check_memory(),
        "suspicious_processes": check_processes()
    }}

    critical = []
    if report["disk"]["status"] == "warning":
        critical.append("High disk usage")
    if report["memory"]["status"] == "warning":
        critical.append("Memory or swap usage too high")
    if len(report["suspicious_processes"]) > 0:
        critical.append("Suspicious processes found")

    report["summary"] = {{
        "issues_detected": len(critical),
        "critical": critical,
        "safe_to_install": len(critical) == 0,
        "recommendation": (
            "System healthy, safe to install Cyber Defender." if len(critical) == 0
            else "System issues found. Recommend fixing before installation."
        )
    }}

    Path("{report_path.parent}").mkdir(parents=True, exist_ok=True)
    with open("{report_path}", "w") as f:
        json.dump(report, f, indent=2)

    print_summary(report)

if __name__ == "__main__":
    main()
"""

# Write the script file
script_path.write_text(script_content)
script_path.chmod(0o755)

script_path
