"""Cut hf-depart frame 0 into depth planes: far (sky+hills), mid (sea, breakwater), boat, quay (foreground).
Clean plate = frame with boat + quay inpainted, so moving cutouts never expose a duplicate."""
import cv2, numpy as np, sys
src = cv2.imread('lab/hero/f0.png')  # 2560x1440
H, W = src.shape[:2]
s = 0.5
small = cv2.resize(src, (int(W*s), int(H*s)), interpolation=cv2.INTER_AREA)
# --- boat: hand-traced silhouette at 1280x720 (hull + wheelhouse, mast, boom, rear mast), refined to its edges by GrabCut
boat = np.zeros(small.shape[:2], np.uint8)
hull = [[316,318],[905,362],[912,268],[1170,266],[1172,408],[1240,418],[1256,440],[1250,548],[1214,632],[1060,612],[700,540],[420,478],[338,452],[326,380]]
cv2.fillPoly(boat, [np.array(hull, np.int32)], 255)
for poly in ([[628,104],[662,104],[662,430],[628,430]], [[500,92],[536,92],[662,412],[630,424]], [[1036,30],[1080,30],[1072,272],[1040,272]], [[912,300],[930,300],[930,345],[912,345]]):
    cv2.fillPoly(boat, [np.array(poly, np.int32)], 255)
gc = np.where(cv2.dilate(boat, np.ones((13,13),np.uint8)) > 0, cv2.GC_PR_FGD, cv2.GC_BGD).astype(np.uint8)
gc[cv2.erode(boat, np.ones((21,21),np.uint8)) > 0] = cv2.GC_FGD
bgd = np.zeros((1, 65), np.float64); fgd = np.zeros((1, 65), np.float64)
cv2.grabCut(small, gc, None, bgd, fgd, 5, cv2.GC_INIT_WITH_MASK)
boat = np.where((gc == 1) | (gc == 3), 255, 0).astype(np.uint8)
boat = cv2.morphologyEx(boat, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8))
# the quay slab overlaps the hull bottom: exclude it from the boat
quay = np.zeros_like(boat)
cv2.fillPoly(quay, [np.array([[648, 652], [985, 640], [1032, 628], [1280, 612], [1280, 720], [652, 720]], np.int32)], 255)
boat[quay > 0] = 0
# --- clean plate: inpaint boat + quay (dilated) at small scale, paste back upscaled only inside the hole
hole = cv2.dilate(cv2.bitwise_or(boat, quay), np.ones((15, 15), np.uint8))
plate_s = cv2.inpaint(small, hole, 9, cv2.INPAINT_TELEA)
plate_up = cv2.resize(plate_s, (W, H), interpolation=cv2.INTER_CUBIC)
hole_up = cv2.resize(hole, (W, H), interpolation=cv2.INTER_NEAREST)
plate = src.copy(); plate[hole_up > 0] = plate_up[hole_up > 0]
# soft alpha edges at full size
def soft(m):
    m = cv2.resize(m, (W, H), interpolation=cv2.INTER_LINEAR)
    return cv2.GaussianBlur(m, (5, 5), 0)
def rgba(img, a):
    out = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA); out[:, :, 3] = a; return out
a_boat, a_quay = soft(boat), soft(quay)
# far plane: everything above the waterline of the far shore (y ~ 232 at full res), feathered
yy = np.arange(H)[:, None].repeat(W, 1).astype(np.float32)
a_far = np.clip((260 - yy) / 40, 0, 1) * 255
cv2.imwrite('lab/hero/plate.png', plate)
cv2.imwrite('lab/hero/far.png', rgba(plate, a_far.astype(np.uint8)))
cv2.imwrite('lab/hero/boat.png', rgba(src, a_boat))
cv2.imwrite('lab/hero/quay.png', rgba(src, a_quay))
# QA: boat over magenta, plate
qa = np.full_like(src, (255, 0, 255)); al = a_boat[:, :, None] / 255.0
cv2.imwrite('lab/hero/qa-boat.jpg', cv2.resize((src * al + qa * (1 - al)).astype(np.uint8), (1280, 720)))
cv2.imwrite('lab/hero/qa-plate.jpg', cv2.resize(plate, (1280, 720)))
print('ok', boat.sum() // 255, quay.sum() // 255)
