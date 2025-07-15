# selfix_gui.py

import tkinter as tk
from tkinter import messagebox
import subprocess

def run_healing_daemon():
    subprocess.Popen(["python", "healing_daemon.py"])
    messagebox.showinfo("SELFIX", "Healing Daemon launched.")

def run_antivirus_scanner():
    subprocess.Popen(["python", "antivirus/selfix_scanner.py"])
    messagebox.showinfo("SELFIX", "Antivirus scanner started.")

root = tk.Tk()
root.title("SELFIX CyberDefense Suite")
root.geometry("400x200")

btn1 = tk.Button(root, text="🧠 Start Healing Daemon", command=run_healing_daemon)
btn1.pack(pady=20)

btn2 = tk.Button(root, text="🛡️ Run Antivirus Scanner", command=run_antivirus_scanner)
btn2.pack(pady=20)

root.mainloop()
