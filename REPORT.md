# REPORT: Skylark Exim scroll site (9 Nov 2026)

- **Live:** https://skylark-exim-scroll.vercel.app (Vercel project `skylark-exim-scroll`, scope `miyoglobal1`)
- **Repo:** https://github.com/Tarunchintakunta/skylark-exim-scroll (branch `main`)
- **Build log issue:** https://github.com/Tarunchintakunta/skylark-exim-scroll/issues/1
- Brief (self-authored under explicit delegation): `scrollcraft/builds/skylark-exim-scroll/BRIEF.md`. Clip audit: `lab/CLIP_AUDIT.md`.

## What was built
- **Story `/`**: one fixed canvas (continuous-world grammar). Scroll position maps straight to a frame index every animation frame, with no lerp, the same rule up and down. Chapters join with a one-sided crossfade. Two routes, chosen on the route rail: **Sea catch** (`/#sea`, 11 chapters) and **Farmed shrimp** (`/#pond`, 14 chapters).
- **Hero**: four planes cut from chapter 1's true first frame (hf-depart frame 1): sky/hills, clean plate, boat, quay, plus haze. The headline sits between the sky and the boat on desktop. The planes dolly apart at different rates and respond slightly to the pointer on fine pointers. Phones get their own portrait crop, with the type above the subject.
- **Signature move**: the forked route rail. Two origins merge at the Anandapuram plant. Scroll inks the line, passed stations are stamped, any station jumps there, and the other origin re-routes the story. On phones it becomes a bottom strip.
- **Device families**: scrub (frame sequences), parallax (hero planes), kinetic (masked line rise), reveal (document cards, map wipe), count (700 pallets, 15 markets; both real), pointer (hero planes). Plus the engine's flow/in, tilt and scrub on sub-pages.
- **Loading**: current and next chapter first (every 8th then every 4th frame), then every 8th frame of the whole route, then full detail near the reader, then the rest. The page starts on chapter 1's first frame. Hero planes are preloaded for LCP.
- **Reduced motion**: no frames fetched. Each chapter is a still in normal document flow with all copy visible.
- **Pages**: `/products` (13 products, same label schema, shrimp forms table), `/about` (company, vision, mission, why us, 700-pallet count, partners, a scroll-scrubbed hall clip via the scroll-craft engine), `/contact` (quote form: validates, then opens a pre-filled email to info@skylarkexim.com; without JS it shows the address and phone), `/news` (honest "no updates yet"), 404, `sitemap.xml`, `robots.txt`, `og.jpg`, favicon.
- **Media**: 24 frame sequences (AVIF 1536×864 + 720×1280 portrait at 40 frames per clip; WebP fallback 960×540 / 540×960), 63 MB AVIF in total. About clip hf-wash in AV1, HEVC and H.264, desktop and portrait (encode.sh for H.264, SVT-AV1, x265), with the codec picked by `canPlayType`.

## Chapters and screenshots (live URL, each chapter scrolled down and then back up)
Sea route:

| # | Chapter | Media | Desktop 1440×900 | Phone 390×844 |
|---|---|---|---|---|
| 1 | harbour | hero planes + hf-depart | `lab/live/desktop-sea/01-harbour-down.jpg` · `01-harbour-up.jpg` | `lab/live/mobile-sea/01-harbour-down.jpg` · `01-harbour-up.jpg` |
| 2 | catch | hf-catch | `lab/live/desktop-sea/02-catch-down.jpg` · `02-catch-up.jpg` | `lab/live/mobile-sea/02-catch-down.jpg` · `02-catch-up.jpg` |
| 3 | ice | hf-ice | `lab/live/desktop-sea/03-ice-down.jpg` · `03-ice-up.jpg` | `lab/live/mobile-sea/03-ice-down.jpg` · `03-ice-up.jpg` |
| 4 | plant | hf-arrive, hf-unload-crew, hf-fish-intake | `lab/live/desktop-sea/04-plant-down.jpg` · `04-plant-up.jpg` | `lab/live/mobile-sea/04-plant-down.jpg` · `04-plant-up.jpg` |
| 5 | wash | hf-fish-wash | `lab/live/desktop-sea/05-wash-down.jpg` · `05-wash-up.jpg` | `lab/live/mobile-sea/05-wash-down.jpg` · `05-wash-up.jpg` |
| 6 | cut | hf-fish-cut | `lab/live/desktop-sea/06-cut-down.jpg` · `06-cut-up.jpg` | `lab/live/mobile-sea/06-cut-down.jpg` · `06-cut-up.jpg` |
| 7 | cold | hf-fish-freeze (frames 0–43), hf-store | `lab/live/desktop-sea/07-cold-down.jpg` · `07-cold-up.jpg` | `lab/live/mobile-sea/07-cold-down.jpg` · `07-cold-up.jpg` |
| 8 | papers | ph-docs-blur still | `lab/live/desktop-sea/08-papers-down.jpg` · `08-papers-up.jpg` | `lab/live/mobile-sea/08-papers-down.jpg` · `08-papers-up.jpg` |
| 9 | port | hf-stuff, hf-port-3, hf-cranes | `lab/live/desktop-sea/09-port-down.jpg` · `09-port-up.jpg` | `lab/live/mobile-sea/09-port-down.jpg` · `09-port-up.jpg` |
| 10 | sea | hf-sail | `lab/live/desktop-sea/10-sea-down.jpg` · `10-sea-up.jpg` | `lab/live/mobile-sea/10-sea-down.jpg` · `10-sea-up.jpg` |
| 11 | world | map (earth texture + SVG routes) | `lab/live/desktop-sea/11-world-down.jpg` · `11-world-up.jpg` | `lab/live/mobile-sea/11-world-down.jpg` · `11-world-up.jpg` |

Farmed route:

| # | Chapter | Media | Desktop 1440×900 | Phone 390×844 |
|---|---|---|---|---|
| 1 | ponds | hf-ponds | `lab/live/desktop-pond/01-ponds-down.jpg` · `01-ponds-up.jpg` | `lab/live/mobile-pond/01-ponds-down.jpg` · `01-ponds-up.jpg` |
| 2 | meter | hf-sample | `lab/live/desktop-pond/02-meter-down.jpg` · `02-meter-up.jpg` | `lab/live/mobile-pond/02-meter-down.jpg` · `02-meter-up.jpg` |
| 3 | harvest | hf-harvest, hf-sort | `lab/live/desktop-pond/03-harvest-down.jpg` · `03-harvest-up.jpg` | `lab/live/mobile-pond/03-harvest-down.jpg` · `03-harvest-up.jpg` |
| 4 | plant | hf-arrive, hf-intake | `lab/live/desktop-pond/04-plant-down.jpg` · `04-plant-up.jpg` | `lab/live/mobile-pond/04-plant-down.jpg` · `04-plant-up.jpg` |
| 5 | wash | hf-wash | `lab/live/desktop-pond/05-wash-down.jpg` · `05-wash-up.jpg` | `lab/live/mobile-pond/05-wash-down.jpg` · `05-wash-up.jpg` |
| 6 | peel | hf-peel (frames 0–24) | `lab/live/desktop-pond/06-peel-down.jpg` · `06-peel-up.jpg` | `lab/live/mobile-pond/06-peel-down.jpg` · `06-peel-up.jpg` |
| 7 | lab | hf-lab | `lab/live/desktop-pond/07-lab-down.jpg` · `07-lab-up.jpg` | `lab/live/mobile-pond/07-lab-down.jpg` · `07-lab-up.jpg` |
| 8 | iqf | hf-iqf | `lab/live/desktop-pond/08-iqf-down.jpg` · `08-iqf-up.jpg` | `lab/live/mobile-pond/08-iqf-down.jpg` · `08-iqf-up.jpg` |
| 9 | pack | hf-pack | `lab/live/desktop-pond/09-pack-down.jpg` · `09-pack-up.jpg` | `lab/live/mobile-pond/09-pack-down.jpg` · `09-pack-up.jpg` |
| 10 | cold | hf-store | `lab/live/desktop-pond/10-cold-down.jpg` · `10-cold-up.jpg` | `lab/live/mobile-pond/10-cold-down.jpg` · `10-cold-up.jpg` |
| 11 | papers | ph-docs-blur still | `lab/live/desktop-pond/11-papers-down.jpg` · `11-papers-up.jpg` | `lab/live/mobile-pond/11-papers-down.jpg` · `11-papers-up.jpg` |
| 12 | port | hf-stuff, hf-port-3, hf-cranes | `lab/live/desktop-pond/12-port-down.jpg` · `12-port-up.jpg` | `lab/live/mobile-pond/12-port-down.jpg` · `12-port-up.jpg` |
| 13 | sea | hf-sail | `lab/live/desktop-pond/13-sea-down.jpg` · `13-sea-up.jpg` | `lab/live/mobile-pond/13-sea-down.jpg` · `13-sea-up.jpg` |
| 14 | world | map | `lab/live/desktop-pond/14-world-down.jpg` · `14-world-up.jpg` | `lab/live/mobile-pond/14-world-down.jpg` · `14-world-up.jpg` |

Contact sheets from the skill's `shoot.mjs` (live): `lab/sheets/shoot-desktop.jpg`, `lab/sheets/shoot-mobile.jpg`, `lab/sheets/shoot-reduced.jpg` (logs: `lab/shots-*.log`). Sub-pages at both sizes: `lab/live/pages/`.

## Verification on the live URL
| Check | Result |
|---|---|
| shoot.mjs desktop / mobile / reduced | No dead scroll (after fix 1 below). Every cue clears 4.5:1 at its worst frame, at all three settings. |
| Walk down + up, real wheel input, cold deployment, reading pace (`lab/walk-all.sh`) | 0 blank frames on all 4 runs. Frame time p95 16.7–16.8 ms and max 33 ms (60 fps, at most one dropped frame in a row). 0 console errors, 0 failed requests. |
| Exact frame vs nearest loaded frame (cold) | On first arrival, a frame not yet decoded is replaced by the nearest decoded frame of the same clip. Share of draws that were a neighbour: desktop sea 11%, phone sea 15%, desktop pond 19%, phone pond 7%. These happen on the first pass down; scrolling back up was exact on 3 of 4 runs. |
| Stress walk at about 2,500 px/s on a cold CDN | 0 blank frames after the load-order fix. Neighbour frames are more frequent (the network is the limit). |
| Links and media | Every http link on all pages returns 200. Media, PDF, sitemap, robots, OG and favicon return 200. Unknown paths return the 404 page with status 404. |
| Quote form | An empty submit is blocked by validation. A filled submit builds `mailto:info@skylarkexim.com?subject=Quote request: Vannamei&body=…` and shows the confirmation note. |

Lighthouse **mobile**, live (`lab/lh/*.json`):

| Page | Perf | A11y | BP | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| home-1 | 99 | 100 | 100 | 100 | 1.60 s | 0.000 | 0 ms |
| home-2 | 99 | 100 | 100 | 100 | 1.65 s | 0.000 | 0 ms |
| home-3 | 100 | 100 | 100 | 100 | 1.65 s | 0.000 | 0 ms |
| products | 100 | 100 | 100 | 100 | 1.27 s | 0.000 | 0 ms |
| about | 100 | 100 | 100 | 100 | 1.60 s | 0.000 | 0 ms |
| contact | 98 | 100 | 100 | 100 | 1.85 s | 0.000 | 0 ms |
| news | 100 | 100 | 100 | 100 | 1.26 s | 0.000 | 0 ms |

Targets were met on every page: Perf ≥ 90, LCP ≤ 2.5 s, CLS ≤ 0.05, A11y ≥ 95.

## Fixed during verification (each was redeployed and re-verified)
1. `shoot.mjs` found dead scroll in Papers: the still's push-in never redrew because its draw signature ignored scale. Fixed. The rerun reports no dead scroll.
2. Cold CDN walk had blank (stale) draws: frames loaded chapter by chapter. Fixed by switching to coarse-to-fine tiers across the whole route. Blank draws went from 599 to 0.
3. Lighthouse Best Practices on /contact scored 79 because the form had `action="mailto:"` (insecure form). The JS composes the email instead, and a no-JS note is shown. Now 100.
4. Hero headline was hidden by the mast at first paint: narrowed so it reads whole; the boat now overlaps it only as you scroll. The rail got a backing panel, scrims were strengthened, the two Cold captions no longer overlap, and temperatures use no-break spaces.

## Clips dropped and why (full table: `lab/CLIP_AUDIT.md`)
- **hero-loop**: a seamless loop whose tail dissolves back to its head (loops back).
- **hf-reverse**: the truck reverses into the dock (backward motion).
- **hf-return**: a second boat at the frame edges (one vessel per shot).
- **hf-unload-shrimp**: morphs mid-clip from the yard to an interior (not one shot).
- **hf-port-4, hf-port-5**: jump cuts inside the clip.
- **hf-ship**: pseudo-lettering on a stern placard (v3 audit), i.e. readable-text artefact.
- Not used, to keep chapters short: opening, hf-unload-fish, hf-port-1, hf-port-2. **hf-peel** is trimmed to frames 0–24 (after that the camera glides into the lab). **hf-fish-freeze** is trimmed to frames 0–43 (as in v3, the push-in later crops a face).

## Still open
- **Real phone not tested.** Headless Chrome cannot reproduce iOS decoding, Low Power Mode or touch momentum. The canvas player avoids `<video>` on the story, so the iOS priming issue does not apply there; the About page clip uses the engine's iOS handling.
- **Cold first pass is network-bound.** On a cold CDN and fast scrolling, some draws are the nearest decoded frame for the first second of a chapter. They are never blank or frozen, but the motion steps more coarsely until the fine frames arrive. Lowering this further needs smaller frames (softer) or fewer frames per clip.
- **Vercel scope.** The CLI login here does not have the v3 team (`tarun-44555f1b`), so the new project is in `miyoglobal1`. v3 and its project were not touched. The production URL briefly served an incomplete build while frames were uploaded in batches (the CLI's single 250 MB upload kept failing with "fetch failed").
- **Copy confirmations carried over from v3**: "Pink / Brown" naming, and the Swordfish still (v3 flagged it for regeneration). The site uses the official content only; "coastal communities" in the vision follows v3's cleaned wording.
- **News** has no posts, because there is no real news source.
- One large first commit holds all the media (about 250 MB). Later commits are small.
- The fingerprint registry row was appended in `scrollcraft/FINGERPRINTS.md`. The feel-check diff is in BRIEF.md (Wash and Cut read alike; the copy anchors were alternated).
