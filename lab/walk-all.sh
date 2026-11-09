#!/bin/bash
# Final live pass: every chapter down and up, both routes, desktop 1440x900 and phone 390x844.
U=${1:-https://skylark-exim-scroll.vercel.app}
rm -rf lab/live
while read name w h route flag; do
  node lab/walk.mjs --url $U --out lab/live/$name --width $w --height $h --route $route $flag --step-ms ${STEP:-120} > lab/live-$name.log 2>&1
  python3 -c "
import json;r=json.load(open('lab/live/$name/walk.json'));print('$name', r['chapters'],'chapters', r['frameMs'], 'over20ms',r['over20ms'], r['stats'], 'errors',len(r['errors']),'failed',len(r['failed']))"
done <<'L'
desktop-sea 1440 900 sea
mobile-sea 390 844 sea --mobile
desktop-pond 1440 900 pond
mobile-pond 390 844 pond --mobile
L
