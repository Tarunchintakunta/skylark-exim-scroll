# skylark-exim-scroll

Scroll story site for **Skylark Exim**, seafood exporter in Visakhapatnam, Andhra Pradesh.

**Live:** https://skylark-exim-scroll.vercel.app

- Story (`/`): one fixed canvas; scroll scrubs AVIF/WebP frame sequences directly, down and up. Two routes: sea catch (`/#sea`) and farmed shrimp (`/#pond`), chosen on the route rail.
- Pages: `/products`, `/about`, `/contact` (quote form, opens a pre-filled email to info@skylarkexim.com), `/news`, 404.
- Built with Vite + TypeScript and the scroll-craft engine (sub-pages). Report: [REPORT.md](REPORT.md). Progress: [PROGRESS.md](PROGRESS.md).

```bash
npm install
npm run dev        # http://localhost:5173
npm run build && npm run preview   # http://localhost:4600
node lab/walk.mjs --url http://localhost:4600 --out lab/walk-desktop            # down + up, every chapter
node lab/walk.mjs --url http://localhost:4600 --out lab/walk-mobile --width 390 --height 844 --mobile
```

Media scripts: `scripts/frames.sh` (frame sequences), `scripts/planes.py` (hero planes), `scripts/webp-fallback.sh`, `scripts/pages.py` (writes the sub-pages).
