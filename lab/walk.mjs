// Scroll every chapter DOWN then back UP with real wheel input, screenshot each chapter in both directions,
// and record frame timing, console errors, failed requests and frames that were not decoded in time.
// usage: node lab/walk.mjs --url URL --out DIR [--width 1440 --height 900] [--mobile] [--route sea|pond]
import { chromium } from 'playwright-core'
import fs from 'node:fs'
const a = (n, d) => { const i = process.argv.indexOf(n); return i > -1 ? process.argv[i + 1] : d }
const URL0 = a('--url', 'http://localhost:4600'), OUT = a('--out', 'lab/walk'), W = +a('--width', 1440), H = +a('--height', 900)
const MOBILE = process.argv.includes('--mobile'), ROUTE = a('--route', 'sea'), STEP_MS = +a('--step-ms', 40)
fs.mkdirSync(OUT, { recursive: true })
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', args: ['--disable-gpu-vsync'] })
const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: MOBILE ? 3 : 1, isMobile: MOBILE, hasTouch: MOBILE })
const page = await ctx.newPage()
const errors = [], failed = []
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()) })
page.on('pageerror', (e) => errors.push(String(e)))
page.on('requestfailed', (r) => failed.push(`${r.url()} ${r.failure()?.errorText}`))
page.on('response', (r) => { if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`) })
await page.goto(`${URL0}/#${ROUTE}`, { waitUntil: 'domcontentloaded' })
await page.waitForSelector('html.sc-ready', { timeout: 20000 })
await page.waitForTimeout(400)
await page.screenshot({ path: `${OUT}/00-first-screen.png` })
const chs = await page.evaluate(() => [...document.querySelectorAll('section.ch')].map((s) => ({ id: s.id, top: s.offsetTop, h: s.offsetHeight })))
// frame timing probe
await page.evaluate(() => { const w = window; w.__ft = []; let t = performance.now(); const f = (n) => { w.__ft.push(n - t); t = n; requestAnimationFrame(f) }; requestAnimationFrame(f) })
async function wheelTo(y) {
  const cur = await page.evaluate(() => scrollY)
  const steps = Math.ceil(Math.abs(y - cur) / 100)
  for (let i = 0; i < steps; i++) {
    if (MOBILE) await page.evaluate((d) => scrollBy(0, d), Math.sign(y - cur) * 100)
    else await page.mouse.wheel(0, Math.sign(y - cur) * 100)
    await page.waitForTimeout(STEP_MS)
  }
  await page.evaluate((y) => scrollTo(0, y), y)
}
async function shotAll(dir, list) {
  for (const [k, c] of list) {
    const y = Math.round(c.top + c.h * 0.5)
    await wheelTo(y)
    await page.waitForTimeout(260)
    const st = await page.evaluate(() => ({ s: document.querySelector('.stage').dataset.scVerifyState, sc: { ...window.__sc.stats } }))
    const name = `${String(k + 1).padStart(2, '0')}-${c.id}-${dir}.png`
    await page.screenshot({ path: `${OUT}/${name}` })
    console.log(`${dir.padEnd(4)} ${name.padEnd(28)} state=${st.s} miss=${st.sc.miss}/${st.sc.need} blank=${st.sc.blank}`)
  }
}
await page.evaluate(() => scrollTo(0, 0))
const t0 = Date.now()
await shotAll('down', chs.map((c, i) => [i, c]))
await shotAll('up', chs.map((c, i) => [i, c]).reverse())
const ft = await page.evaluate(() => window.__ft.slice(5))
ft.sort((x, y) => x - y)
const p = (q) => ft[Math.floor(ft.length * q)].toFixed(1)
const sc = await page.evaluate(() => window.__sc.stats)
const res = { url: URL0, route: ROUTE, viewport: `${W}x${H}`, chapters: chs.length, seconds: (Date.now() - t0) / 1000, frames: ft.length, frameMs: { p50: p(0.5), p95: p(0.95), p99: p(0.99), max: ft[ft.length - 1].toFixed(1) }, over20ms: ft.filter((x) => x > 20).length, stats: sc, errors, failed }
fs.writeFileSync(`${OUT}/walk.json`, JSON.stringify(res, null, 2))
console.log(JSON.stringify({ ...res, errors: errors.length, failed: failed.length }, null, 1))
if (errors.length) console.log('ERRORS', errors.slice(0, 5))
if (failed.length) console.log('FAILED', failed.slice(0, 5))
await browser.close()
