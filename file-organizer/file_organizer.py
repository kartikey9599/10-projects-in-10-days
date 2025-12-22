import os
import shutil
import argparse
import json
import logging

# ---------------- LOGGING SETUP ----------------
logging.basicConfig(
    filename="organizer.log",
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

# ---------------- LOAD CONFIG ----------------
def load_config(config_path="config.json"):
    if os.path.exists(config_path):
        with open(config_path, "r") as f:
            return json.load(f)
    else:
        # Default fallback config
        return {
            "Images": [".jpg", ".png"],
            "Documents": [".txt", ".pdf"],
            "Videos": [".mp4"],
            "Others": []
        }

# ---------------- FIND DESTINATION FOLDER ----------------
def get_destination_folder(extension, mapping):
    for folder, extensions in mapping.items():
        if extension in extensions:
            return folder
    return "Others"

# ---------------- ORGANIZER LOGIC ----------------
def organize_files(target_dir, dry_run=False):
    mapping = load_config()

    for item in os.listdir(target_dir):
        src_path = os.path.join(target_dir, item)

        # Ignore folders
        if not os.path.isfile(src_path):
            continue

        _, ext = os.path.splitext(item)
        ext = ext.lower()

        dest_folder_name = get_destination_folder(ext, mapping)
        dest_folder_path = os.path.join(target_dir, dest_folder_name)
        dest_path = os.path.join(dest_folder_path, item)

        if dry_run:
            print(f"[DRY RUN] {item} → {dest_folder_name}/")
        else:
            os.makedirs(dest_folder_path, exist_ok=True)
            shutil.move(src_path, dest_path)
            logging.info(f"Moved {item} → {dest_folder_name}/")
            print(f"Moved {item} → {dest_folder_name}/")

# ---------------- CLI ----------------
def main():
    parser = argparse.ArgumentParser(description="File Organizer Script")
    parser.add_argument("--path", required=True, help="Target directory to organize")
    parser.add_argument("--dry-run", action="store_true", help="Preview changes without moving files")

    args = parser.parse_args()

    if not os.path.isdir(args.path):
        print("❌ Invalid directory path")
        return

    organize_files(args.path, args.dry_run)

if __name__ == "__main__":
    main()
