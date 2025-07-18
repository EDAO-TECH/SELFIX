import tkinter as tk
from tkinter import messagebox
import subprocess
import os
import logging

# Setup logging
logging.basicConfig(filename="selfix_gui.log", level=logging.INFO, format="%(asctime)s %(levelname)s: %(message)s")

class SelfixGUI(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("SELFIX CyberDefense Suite")
        self.geometry("400x250")
        self.resizable(True, True)

        icon_path = "assets/selfix_icon.ico"
        if os.path.exists(icon_path):
            try:
                self.iconbitmap(icon_path)
            except Exception as e:
                logging.warning(f"Could not set icon: {e}")

        self.create_widgets()
        self.status_var = tk.StringVar()
        self.status_label = tk.Label(self, textvariable=self.status_var, fg="blue")
        self.status_label.grid(row=3, column=0, columnspan=2, pady=5, sticky="ew")
        self.set_status("Ready.")

    def create_widgets(self):
        btn1 = tk.Button(self, text="🧠 Start Healing Daemon", command=self.run_healing_daemon)
        btn1.grid(row=0, column=0, padx=20, pady=20, sticky="ew")

        btn2 = tk.Button(self, text="🛡️ Run Antivirus Scanner", command=self.run_antivirus_scanner)
        btn2.grid(row=1, column=0, padx=20, pady=20, sticky="ew")

        btn_exit = tk.Button(self, text="❌ Quit", command=self.destroy)
        btn_exit.grid(row=2, column=0, padx=20, pady=10, sticky="ew")

    def run_healing_daemon(self):
        path = "healing_daemon.py"
        if not os.path.exists(path):
            messagebox.showerror("Error", f"{path} not found.")
            self.set_status("Healing Daemon not found.")
            logging.error("Healing Daemon not found.")
            return
        try:
            subprocess.Popen(["python", path])
            messagebox.showinfo("SELFIX", "Healing Daemon launched.")
            self.set_status("Healing Daemon running.")
            logging.info("Healing Daemon launched.")
        except Exception as e:
            messagebox.showerror("Error", f"Failed to launch Healing Daemon: {e}")
            self.set_status("Healing Daemon launch failed.")
            logging.error(f"Healing Daemon launch failed: {e}")

    def run_antivirus_scanner(self):
        path = "antivirus/selfix_scanner.py"
        if not os.path.exists(path):
            messagebox.showerror("Error", "Antivirus scanner not found.")
            self.set_status("Antivirus scanner not found.")
            logging.error("Antivirus scanner not found.")
            return
        try:
            subprocess.Popen(["python", path])
            messagebox.showinfo("SELFIX", "Antivirus scanner started.")
            self.set_status("Antivirus scanner running.")
            logging.info("Antivirus scanner started.")
        except Exception as e:
            messagebox.showerror("Error", f"Failed to start Antivirus Scanner: {e}")
            self.set_status("Antivirus scanner launch failed.")
            logging.error(f"Antivirus scanner launch failed: {e}")

    def set_status(self, message):
        self.status_var.set(message)

if __name__ == "__main__":
    app = SelfixGUI()
    app.mainloop()
