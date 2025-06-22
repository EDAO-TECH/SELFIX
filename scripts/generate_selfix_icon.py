from PIL import Image, ImageDraw, ImageFont
import os

# Paths
os.makedirs("assets", exist_ok=True)

# Settings
WIDTH, HEIGHT = 512, 512
BG_COLOR = (240, 240, 240)
CIRCLE_COLOR = (20, 40, 60)
TEXT_COLOR = (255, 255, 255)
FONT_PATH = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"

# Create canvas
img = Image.new("RGB", (WIDTH, HEIGHT), BG_COLOR)
draw = ImageDraw.Draw(img)

# Circle
circle_radius = 230
draw.ellipse(
    [(WIDTH//2 - circle_radius, HEIGHT//2 - circle_radius),
     (WIDTH//2 + circle_radius, HEIGHT//2 + circle_radius)],
    fill=CIRCLE_COLOR
)

# Shield rectangle
draw.rectangle([186, 186, 326, 326], fill=BG_COLOR, outline=TEXT_COLOR, width=6)
draw.ellipse([230, 210, 282, 262], outline=TEXT_COLOR, width=4)  # "globe"

# Top text
font = ImageFont.truetype(FONT_PATH, 48)
draw.text((WIDTH//2 - 65, 40), "SELFIX", font=font, fill=TEXT_COLOR)

# Bottom line text
bottom_font = ImageFont.truetype(FONT_PATH, 18)
bottom_text = "DETECTION • TRANSPARENCY • HEALING • TRUSTLESS • FORENSICS"
draw.text((45, 460), bottom_text, font=bottom_font, fill=TEXT_COLOR)

# Save
img.save("assets/selfix_icon.png")
img.save("assets/selfix_icon.ico")
img.save("assets/selfix_icon.icns")

print("✅ SELFIX icons generated in /assets/")
