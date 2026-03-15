import os
from PIL import Image

input_folder = "original"
output_folder = "compressed"

os.makedirs(output_folder, exist_ok=True)

MAX_WIDTH = 1500
QUALITY = 85

for filename in os.listdir(input_folder):
    if filename.lower().endswith((".jpg", ".jpeg", ".png")):
        path = os.path.join(input_folder, filename)
        img = Image.open(path)

        # 비율 유지하면서 리사이즈
        width, height = img.size
        if width > MAX_WIDTH:
            ratio = MAX_WIDTH / width
            new_size = (MAX_WIDTH, int(height * ratio))
            img = img.resize(new_size, Image.LANCZOS)

        output_path = os.path.join(output_folder, filename)

        img.save(output_path, "JPEG", quality=QUALITY, optimize=True)

        print(f"compressed: {filename}")