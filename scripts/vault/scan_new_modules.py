import os

UNVERIFIED_PATH = "/opt/SELFIX/healing_modules/promoted/"
forgiveness_staging = "/opt/SELFIX/book_of_forgiveness/_staging/"

os.makedirs(forgiveness_staging, exist_ok=True)

for file in os.listdir(UNVERIFIED_PATH):
    if file.endswith(".py"):
        src = os.path.join(UNVERIFIED_PATH, file)
        dst = os.path.join(forgiveness_staging, file)
        print(f"[📥] Staging module: {file}")
        os.system(f"cp '{src}' '{dst}'")
