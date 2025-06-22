import os

STAGING = "/opt/SELFIX/book_of_forgiveness/_staging/"

for f in os.listdir(STAGING):
    if f.endswith(".py"):
        os.remove(os.path.join(STAGING, f))
        print(f"[🧹] Deleted: {f}")
