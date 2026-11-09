# PROGRESS

Live URL: https://skylark-exim-scroll.vercel.app (Vercel project skylark-exim-scroll, scope miyoglobal1)
Repo: https://github.com/Tarunchintakunta/skylark-exim-scroll

## Done
- Read scroll-craft SKILL.md and all references; ran doctor.mjs (ok: node, full ffmpeg, Chrome; no libwebp in ffmpeg, cwebp used instead) and workspace.mjs --ensure.
- Copied (not moved) v3 masters, web media and public assets into `assets-src/` (git-ignored, 1.9 GB).
- Read v3 README, FINAL_REPORT, docs/CONTENT.md, src/config/chapters.ts for facts and order.
- Clip audit: `lab/CLIP_AUDIT.md` (7 clips dropped, reasons listed).
- Brief: `scrollcraft/builds/skylark-exim-scroll/BRIEF.md`.

- Encoded 24 frame sequences (AVIF primary 1536x864 / 720x1280 portrait, WebP fallback), About clip in AV1/HEVC/H.264 desktop + portrait.
- Hero: four planes cut from hf-depart frame 1 (OpenCV GrabCut + inpainted clean plate).
- Site: story (sea + farmed routes), products, about, contact (mailto form), news, 404, sitemap, robots, OG image, favicon.
- Local walk down + up, desktop 1440x900 and mobile 390x844: 0 missed frames, p95 16.8 ms, 0 console errors.
- Deployed to Vercel production.

- Live verification: shoot.mjs (desktop/mobile/reduced), down+up walks on both routes at 1440x900 and 390x844, Lighthouse mobile on every page, links, form. Fixes redeployed and re-verified. See REPORT.md.

- 9 Nov: Sea chapter fixed (hf-sail had a tug alongside; it is now hf-ice-wake, a reframe of the boat under way). Redeployed and re-verified on live.

## Next
- Nothing blocking. Open items are listed in REPORT.md ("Still open").

## Blockers
- None now. Vercel CLI bulk upload kept failing ("fetch failed"), so the frames were uploaded in batches. The v3 Vercel team is not on this CLI login, so the project is in scope miyoglobal1.
