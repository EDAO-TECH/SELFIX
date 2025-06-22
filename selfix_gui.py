import tkinter as tk
from tkinter import scrolledtext, messagebox
import subprocess
import time
import json
from pathlib import Path

LOG_FILE = Path("logs/maintenance.log")
AI_RESPONSES = {
    "hello": "Hi! I'm your Selfix Assistant.",
    "status": "System appears stable. No active threats logged.",
    "heal": "Healing started... stand by.",
    "scan": "Scanning now... hang tight!",
    "help": "You can ask me to scan, heal, or give a quick health check."
}

class SelfixGUI:
    def __init__(self, root):
        self.root = root
        root.title("🧠 SELFIX Standard Assistant")

        # Buttons
        self.scan_button = tk.Button(root, text="🛡️ Start Scan", command=self.run_scan)
        self.scan_button.grid(row=0, column=0, padx=5, pady=5)

        self.heal_button = tk.Button(root, text="💉 Start Healing", command=self.run_heal)
        self.heal_button.grid(row=0, column=1, padx=5, pady=5)

        self.check_button = tk.Button(root, text="📋 Pre-Health Check", command=self.show_status)
        self.check_button.grid(row=0, column=2, padx=5, pady=5)

        # Log output
        self.log_area = scrolledtext.ScrolledText(root, height=10, width=80)
        self.log_area.grid(row=1, column=0, columnspan=3, padx=10)

        # Chat
        self.chat_display = scrolledtext.ScrolledText(root, height=8, width=80, state='disabled')
        self.chat_display.grid(row=2, column=0, columnspan=3, padx=10, pady=10)

        self.chat_input = tk.Entry(root, width=70)
        self.chat_input.grid(row=3, column=0, columnspan=2, padx=5)
        self.send_button = tk.Button(root, text="💬 Send", command=self.respond_to_chat)
        self.send_button.grid(row=3, column=2)

    def run_scan(self):
        self.append_log("[🛡️] Running scan...")
        subprocess.run(["python3", "antivirus/selfix_scanner.py"])
        self.read_log()

    def run_heal(self):
        self.append_log("[💉] Running healing...")
        subprocess.run(["python3", "antivirus/selfix_scheduler.py"])
        self.read_log()

    def show_status(self):
        self.append_log("[📋] Running health check...")
        messagebox.showinfo("System Status", "SELFIX is online.\nLast scan: OK\nThreats healed: ✅")

    def read_log(self):
        if LOG_FILE.exists():
            with open(LOG_FILE, "r") as f:
                self.log_area.delete(1.0, tk.END)
                self.log_area.insert(tk.END, f.read())

    def append_log(self, msg):
        timestamp = time.strftime("%H:%M:%S")
        self.log_area.insert(tk.END, f"[{timestamp}] {msg}\n")
        self.log_area.see(tk.END)

    def respond_to_chat(self):
        user_input = self.chat_input.get().strip().lower()
        self.chat_input.delete(0, tk.END)

        if not user_input:
            return

        self.append_chat("You", user_input)
        response = self.get_ai_reply(user_input)
        self.append_chat("SELFIX AI", response)

    def append_chat(self, speaker, text):
        self.chat_display.config(state='normal')
        self.chat_display.insert(tk.END, f"{speaker}: {text}\n")
        self.chat_display.config(state='disabled')
        self.chat_display.see(tk.END)

    def get_ai_reply(self, text):
        for key in AI_RESPONSES:
            if key in text:
                return AI_RESPONSES[key]
        return "I'm not sure, but you can try 'scan', 'status', or 'heal'."

if __name__ == "__main__":
    root = tk.Tk()
    app = SelfixGUI(root)
    root.mainloop()
