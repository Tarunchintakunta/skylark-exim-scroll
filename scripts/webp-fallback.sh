#!/bin/bash
# WebP fallback frames for browsers without AVIF: smaller than the AVIF set (960x540 / 540x960), made from the AVIF frames.
set -e
f=$1; d=$(dirname $f); b=$(basename $f .avif); t=lab/tmp/wf-$$; mkdir -p $t
case "$d" in */d) s=960:540;; */m) s=540:960;; esac
ffmpeg -v quiet -y -i "$f" -vf "scale=$s:flags=lanczos" "$t/x.png" && cwebp -quiet -q 55 -m 4 "$t/x.png" -o "$d/$b.webp"
rm -rf "$t"
