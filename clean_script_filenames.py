import os
import re

# Set root path to start scanning
ROOT_DIR = "/opt/SELFIX"

# Compile regex patterns
idea_pattern = re.compile(r"^idea:_(.+)\012?\.py$")
double_py_pattern = re.compile(r"(.*)py\.py$")

def sanitize_filename(name):
    """Sanitize the filename by removing non-alphanumeric characters and underscores"""
    name = name.replace(' ', '_').replace(':', '').replace(',', '')
    name = re.sub(r'[^\w_.-]', '_', name)
    return name

def rename_files():
    for root, dirs, files in os.walk(ROOT_DIR):
        for file in files:
            original_path = os.path.join(root, file)
            new_filename = None

            # Handle idea:_... encoded files
            match_idea = idea_pattern.match(file)
            if match_idea:
                new_filename = "idea_" + sanitize_filename(match_idea.group(1)) + ".py"

            # Handle double .py.py suffix
            elif double_py_pattern.match(file):
                new_filename = double_py_pattern.sub(r"\1.py", file)

            if new_filename and new_filename != file:
                new_path = os.path.join(root, new_filename)
                print(f"Renaming: {original_path} ➜ {new_path}")
                os.rename(original_path, new_path)

if __name__ == "__main__":
    rename_files()
