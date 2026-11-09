#!/bin/bash
src(){ if [ -f assets-src/masters/$1/master.mp4 ]; then echo assets-src/masters/$1/master.mp4; else echo assets-src/media/$1_1920.mp4; fi; }
for id in "$@"; do
  f=$(src $id); n=$(ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames -of csv=p=0 "$f")
  step=$(( (n-1)/5 ))
  ffmpeg -v error -y -i "$f" -vf "select='not(mod(n\,$step))',scale=400:-2,tile=6x1" -frames:v 1 lab/audit/$id.jpg
done
