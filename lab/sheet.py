"""usage: python3 lab/sheet.py OUT.jpg COLS WIDTH img1 img2 ...  (tiles screenshots into one sheet)"""
import sys
from PIL import Image
out, cols, w = sys.argv[1], int(sys.argv[2]), int(sys.argv[3])
ims = [Image.open(p).convert('RGB') for p in sys.argv[4:]]
ims = [i.resize((w, round(i.height * w / i.width))) for i in ims]
h = max(i.height for i in ims); rows = -(-len(ims) // cols)
sheet = Image.new('RGB', (cols * w, rows * h), (20, 20, 20))
for k, i in enumerate(ims): sheet.paste(i, ((k % cols) * w, (k // cols) * h))
sheet.save(out, quality=82)
