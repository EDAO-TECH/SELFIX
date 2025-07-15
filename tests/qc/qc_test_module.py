import subprocess
import os

staging_path = "/opt/SELFIX/book_of_forgiveness/_staging/"
qc_passed = []

for file in os.listdir(staging_path):
    if file.endswith(".py"):
        path = os.path.join(staging_path, file)
        print(f"[🧪] Testing: {file}")
        result = subprocess.run(["python3", path], capture_output=True, timeout=10)

        if result.returncode == 0:
            print(f"[✅] Passed: {file}")
            qc_passed.append(file)
        else:
            print(f"[❌] Failed: {file}\n{result.stderr.decode()}")
