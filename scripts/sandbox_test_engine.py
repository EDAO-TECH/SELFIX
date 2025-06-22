#!/usr/bin/env python3
import json
import traceback
from pathlib import Path
from datetime import datetime

MODULES_DIR = Path("/opt/SELFIX/improvements/modules")
TESTS_DIR = Path("/opt/SELFIX/improvements/tests")
SANDBOX_RESULTS = Path("/opt/SELFIX/data/sandbox_results.json")

def load_test_cases():
    tests = []
    for test_file in TESTS_DIR.glob("*.json"):
        try:
            with open(test_file) as f:
                data = json.load(f)
                tests.append({"file": test_file.name, "data": data})
        except Exception as e:
            print(f"[ERROR] Failed to load test case: {test_file.name} - {e}")
    return tests

def simulate_module(module_path, test_data):
    try:
        required_keys = ["entropy_pattern", "expected_fix"]
        score = 0
        for key in required_keys:
            if key in test_data:
                score += 50
        return {"status": "simulated", "score": score}
    except Exception as e:
        return {"status": "error", "error": str(e), "trace": traceback.format_exc()}

def run_sandbox():
    tests = load_test_cases()
    results = []

    for module_file in MODULES_DIR.glob("*.py"):
        for test in tests:
            sim = simulate_module(module_file, test["data"])
            results.append({
                "module": module_file.name,
                "test_case": test["file"],
                "score": sim.get("score", 0),
                "status": sim["status"],
                "timestamp": datetime.now().isoformat()
            })

    SANDBOX_RESULTS.parent.mkdir(parents=True, exist_ok=True)
    with open(SANDBOX_RESULTS, "w") as f:
        json.dump(results, f, indent=2)

    print(f"✅ Sandbox complete. Results saved to {SANDBOX_RESULTS}")

if __name__ == "__main__":
    run_sandbox()
