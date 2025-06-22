import tkinter as tk
from tkinter import filedialog, messagebox, scrolledtext
import json
import os
import hashlib
from datetime import datetime

# Constants
SIGNATURE_FILE = "antivirus/selfix_signatures.json"
SCAN_REPORT_DIR = "logs"

def load_signatures():
    """Load virus signatures from the JSON file."""
    try:
        with open(SIGNATURE_FILE, 'r') as f:
            return json.load(f)
    except Exception:
        return []

def compute_sha256(file_path):
    """Compute SHA256 hash of a file."""
    sha256 = hashlib.sha256()
    try:
        with open(file_path, 'rb') as f:
            while chunk := f.read(8192):
                sha256.update(chunk)
        return sha256.hexdigest()
    except:
        return None

def scan_folder(folder, output_widget):
    """Scan a selected folder for known threats."""
    sigs = load_signatures()
    known_hashes = {s["sha256"]: s for s in sigs}
    found = []

    for root, _, files in os.walk(folder):
        for file in files:
            path = os.path.join(root, file)
            hash_val = compute_sha256(path)
            if hash_val in known_hashes:
                sig = known_hashes[hash_val]
                found.append((path, sig["name"]))
                output_widget.insert(tk.END, f"🚨 Detected: {sig['name']} in {path}\n")

    if not found:
        output_widget.insert(tk.END, "✅ No threats found.\n")
    else:
        save_report(found)

def save_report(results):
    """Save detection report as JSON."""
    os.makedirs(SCAN_REPORT_DIR, exist_ok=True)
    ts = datetime.now().strftime("%Y%m%d-%H%M%S")
    path = os.path.join(SCAN_REPORT_DIR, f"report_{ts}.json")
    with open(path, 'w') as f:
        json.dump(results, f, indent=4)

def launch_gui():
    """Launch the main Tkinter GUI."""
    root = tk.Tk()
    root.title("SELFIX Cyber Scanner")
    root.geometry("650x450")

    # Optional: Display logo (requires Pillow)
    try:
        from PIL import Image, ImageTk
        logo = Image.open("assets/selfix_icon.png")
        logo = logo.resize((80, 80))
        logo_img = ImageTk.PhotoImage(logo)
        logo_label = tk.Label(root, image=logo_img)
        logo_label.image = logo_img
        logo_label.pack(pady=5)
    except Exception:
        pass  # Skip if PIL or image not available

    tk.Label(root, text="SELFIX Cyber Defender", font=("Arial", 18)).pack(pady=5)
    tk.Label(root, text=f"Signatures loaded: {len(load_signatures())}").pack()

    output = scrolledtext.ScrolledText(root, width=80, height=15)
    output.pack(pady=10)

    def on_browse():
        folder = filedialog.askdirectory()
        if folder:
            output.insert(tk.END, f"\n🔍 Scanning: {folder}\n")
            scan_folder(folder, output)

    tk.Button(root, text="Select Folder to Scan", command=on_browse).pack(pady=5)
    tk.Button(root, text="Exit", command=root.quit).pack()

    root.mainloop()

# 🧠 Safe entry point — skip GUI init during py2app build
if __name__ == "__main__":
    import sys
    if not hasattr(sys, 'frozen'):  # Avoid GUI launch during py2app setup
        launch_gui()
