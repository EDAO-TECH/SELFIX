import os
import subprocess

def get_status():
    print("\n🔍 SELFIX Service Status:")
    for svc in ["healing_daemon.py", "selfix_scanner.py"]:
        try:
            output = subprocess.check_output(["pgrep", "-f", svc])
            print(f"✅ {svc} is running (PID: {output.decode().strip()})")
        except subprocess.CalledProcessError:
            print(f"❌ {svc} is not running")

def restart_service(service_name):
    os.system(f"pkill -f {service_name}")
    print(f"♻️ Restarting {service_name}")
    if service_name == "healing_daemon.py":
        os.system("python3 healing_daemon.py &")
    elif service_name == "selfix_scanner.py":
        os.system("python3 antivirus/selfix_scanner.py &")

def main():
    print("🧠 SELFIX Chat Monitor\nType 'exit' to quit.")
    while True:
        cmd = input("👤 > ").strip().lower()
        if cmd == "exit":
            break
        elif cmd == "status":
            get_status()
        elif "restart" in cmd:
            if "scanner" in cmd:
                restart_service("selfix_scanner.py")
            elif "daemon" in cmd:
                restart_service("healing_daemon.py")
        elif "full scan" in cmd:
            os.system("python3 antivirus/selfix_scanner.py")
        else:
            print("🤖 Sorry, I didn't understand. Try: status | restart scanner | full scan")

if __name__ == "__main__":
    main()
