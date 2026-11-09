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

## Next
- Verify on the live URL: walk every chapter down and up (desktop + mobile, cold), shoot.mjs contact sheets, Lighthouse mobile, links.
- Fix findings, redeploy, re-verify. Write REPORT.md.

## Blockers
- Vercel CLI bulk upload (250 MB) timed out with "fetch failed"; solved by uploading the frame folders in batches (Vercel dedupes files), then one --prod deploy.
- The v3 Vercel team (tarun-44555f1b) is not on this CLI login; the new project lives in the logged-in scope miyoglobal1.
