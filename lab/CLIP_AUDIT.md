# Clip audit (rules: one vessel per shot, no readable text, forward-only motion, no loops)

Strips: `lab/audit/g1.jpg` … `g6.jpg` (6 evenly spaced frames per clip, first to last).

| Clip | Verdict | Why |
|---|---|---|
| opening | not used | Kept off the page: it is a city waterfront with no action; chapter 1 is the boat leaving |
| hero-loop | **DROPPED** | A seamless loop: its tail cross-dissolves back to its head, so motion returns to the start |
| hf-depart | KEEP (hero) | One boat, forward |
| hf-catch | KEEP | On deck, forward |
| hf-ice | KEEP | On deck, forward |
| hf-return | **DROPPED** | A second boat enters at the left edge in the first frames and another at the right edge at the end |
| hf-ponds, hf-sample, hf-harvest, hf-sort | KEEP | No vessel, forward |
| hf-arrive | KEEP | Truck drives forward into the yard |
| hf-reverse | **DROPPED** | The truck reverses into the dock: backward motion |
| hf-unload-fish | not used | Near-static; unload-crew carries the beat |
| hf-unload-crew | KEEP | Forward |
| hf-unload-shrimp | **DROPPED** | Morphs mid-clip from the yard to an interior: not one continuous shot |
| hf-intake, hf-fish-intake | KEEP | fish-intake shows exactly one ship through the door |
| hf-wash, hf-fish-wash, hf-fish-cut, hf-lab, hf-iqf, hf-pack | KEEP | Forward |
| hf-peel | KEEP, trimmed to frames 0–24 | After frame ~25 the camera glides into the lab (scene change) |
| hf-fish-freeze, hf-store | KEEP | Forward |
| hf-stuff | KEEP | Forklift into reefer, forward |
| hf-port-1, hf-port-2 | not used | Near-static push on the same set-up as port-3; cut to keep chapters short |
| hf-port-3 | KEEP | Spreader locks and lifts, forward |
| hf-port-4 | **DROPPED** | Contains a jump cut (quay to the top of the stack) |
| hf-port-5 | **DROPPED** | Contains a jump cut (crane close-up to aerial) |
| hf-cranes | KEEP | One ship at the quay |
| hf-ship | **DROPPED** | v3 audit (FINAL_REPORT): stern placard with pseudo-lettering, i.e. text-like artefact |
| hf-sail | KEEP (peak) | One ship alone, forward |
