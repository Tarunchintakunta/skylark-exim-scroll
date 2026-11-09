#!/bin/bash
# Frame sequences for the canvas stage.
# usage: frames.sh <id> <cropx 0..1> [first] [last] [count]
# Writes public/media/seq/<id>/{d,m}/NN.{avif,webp}
#   d: 1536x864 landscape (AVIF crf 42, WebP q 60)
#   m: 720x1280 portrait crop of the 2560x1440 master centred at cropx (AVIF crf 44, WebP q 58)
set -euo pipefail
ID=$1; CX=$2; FIRST=${3:-0}; LAST=${4:-}; N=${5:-40}
# SRC_ID / DCROP / MCROP: optional reframe of another master (e.g. hf-ice-wake = hf-ice cropped to hull, wake and sea)
SRC_ID=${SRC_ID:-$ID}
SRC=assets-src/masters/$SRC_ID/master.mp4
[ -f "$SRC" ] || SRC=assets-src/media/${SRC_ID}_1920.mp4
DCROP=${DCROP:-}; MCROP=${MCROP:-"crop=810:1440:'min(max(${CX}*2560-405,0),1750)':0"}
TOTAL=$(ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames -of csv=p=0 "$SRC")
LAST=${LAST:-$((TOTAL-1))}
OUT=public/media/seq/$ID; TMP=lab/tmp/$ID
rm -rf "$OUT" "$TMP"; mkdir -p "$OUT/d" "$OUT/m" "$TMP"
# every source frame as PNG at master size, then pick N evenly spaced indices (first and last always included)
ffmpeg -v error -y -i "$SRC" -vf "scale=2560:1440:flags=lanczos" "$TMP/%03d.png"
for ((k=0; k<N; k++)); do
  i=$(( FIRST + (k*(LAST-FIRST) + (N-1)/2) / (N-1) ))
  f=$(printf "%s/%03d.png" "$TMP" $((i+1))); o=$(printf "%02d" $k)
  ffmpeg -v quiet -y -i "$f" -vf "${DCROP:+$DCROP,}scale=1536:864:flags=lanczos" "$TMP/d.png"
  ffmpeg -v quiet -y -i "$f" -vf "$MCROP,scale=720:1280:flags=lanczos" "$TMP/m.png"
  ffmpeg -v quiet -y -i "$TMP/d.png" -c:v libsvtav1 -crf 42 -preset 5 -svtav1-params tune=0 -pix_fmt yuv420p "$OUT/d/$o.avif" 2>/dev/null
  ffmpeg -v quiet -y -i "$TMP/m.png" -c:v libsvtav1 -crf 44 -preset 5 -svtav1-params tune=0 -pix_fmt yuv420p "$OUT/m/$o.avif" 2>/dev/null
  ffmpeg -v quiet -y -i "$TMP/d.png" -vf scale=960:540 "$TMP/dw.png"; cwebp -quiet -q 55 -m 4 "$TMP/dw.png" -o "$OUT/d/$o.webp"
  ffmpeg -v quiet -y -i "$TMP/m.png" -vf scale=540:960 "$TMP/mw.png"; cwebp -quiet -q 55 -m 4 "$TMP/mw.png" -o "$OUT/m/$o.webp"
done
rm -rf "$TMP"
echo "$ID $(du -sh $OUT/d | cut -f1) desktop / $(du -sh $OUT/m | cut -f1) mobile ($N frames, src $FIRST-$LAST)"
