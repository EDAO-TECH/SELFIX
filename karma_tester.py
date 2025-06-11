import subprocess
import json
from datetime import datetime

TEST_MODULES = ['yang_engine.py', 'entropy_resolver.py']
LOG_FILE = '/opt/SELFIX/logs/karma_test_log.json'

def test_module(file_path):
    try:
        result = subprocess.run(['python3', file_path], capture_output=True, text=True, timeout=10)
        return {
            "file": file_path,
            "returncode": result.returncode,
            "stdout": result.stdout.strip(),
            "stderr": result.stderr.strip(),
            "success": result.returncode == 0
        }
    except Exception as e:
        return {
            "file": file_path,
            "error": str(e),
            "success": False
        }

def run_tests():
    results = {
        "tested_on": datetime.utcnow().isoformat(),
        "modules": []
    }

    for module in TEST_MODULES:
        path = f"/opt/SELFIX/{module}"
        results["modules"].append(test_module(path))

    with open(LOG_FILE, 'w') as f:
        json.dump(results, f, indent=4)

    print(f"🧪 Karma test complete. Results saved to {LOG_FILE}")

if __name__ == "__main__":
    run_tests()
