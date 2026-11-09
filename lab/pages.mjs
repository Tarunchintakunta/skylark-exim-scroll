// Sub-pages: screenshots at desktop + phone, console errors, every link and asset status, quote form behaviour.
import { chromium } from 'playwright-core'
import fs from 'node:fs'
const U = process.argv[2] ?? 'https://skylark-exim-scroll.vercel.app', OUT = process.argv[3] ?? 'lab/live/pages'
fs.mkdirSync(OUT, { recursive: true })
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' })
const errors = [], bad = [], links = new Set()
for (const [vw, vh, tag, mobile] of [[1440, 900, 'desktop', false], [390, 844, 'mobile', true]]) {
  const ctx = await browser.newContext({ viewport: { width: vw, height: vh }, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: mobile ? 2 : 1 })
  for (const p of ['/products', '/about', '/contact', '/news', '/does-not-exist']) {
    const page = await ctx.newPage()
    page.on('console', (m) => m.type() === 'error' && errors.push(`${p} ${m.text()}`))
    page.on('pageerror', (e) => errors.push(`${p} ${e}`))
    page.on('response', (r) => r.status() >= 400 && !r.url().endsWith('/does-not-exist') && bad.push(`${r.status()} ${r.url()}`))
    const res = await page.goto(U + p, { waitUntil: 'networkidle' })
    if (p === '/does-not-exist') console.log(`404 page status ${res.status()} title "${await page.title()}"`)
    // scroll through so reveal-on-entry content and the about scrub act run
    const h = await page.evaluate(() => document.body.scrollHeight)
    for (let y = 0; y < h; y += 400) { await page.evaluate((y) => scrollTo(0, y), y); await page.waitForTimeout(60) }
    await page.waitForTimeout(500)
    await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(300)
    await page.screenshot({ path: `${OUT}/${tag}${p.replace(/\//g, '-')}.png`, fullPage: true })
    for (const a of await page.$$eval('a[href]', (as) => as.map((a) => a.href))) links.add(a)
    await page.close()
  }
  await ctx.close()
}
// quote form: required fields block an empty submit; a filled submit navigates to a mailto with the request in it
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
const page = await ctx.newPage()
await page.goto(U + '/contact', { waitUntil: 'networkidle' })
let mail = ''
await page.route('**/*', (r) => r.continue())
page.on('framenavigated', () => {})
await page.evaluate(() => { Object.defineProperty(window, '__mail', { value: [], writable: true }) })
await page.click('button[type=submit]')
const blocked = await page.evaluate(() => !document.querySelector('#quote-note').hidden === false)
await page.fill('input[name=name]', 'Test Buyer'); await page.fill('input[name=email]', 'buyer@example.com'); await page.fill('input[name=port]', 'Japan, Tokyo port')
await page.check('input[value="Vannamei"]'); await page.fill('input[name=details]', 'Headless shell-on, frozen')
await page.evaluate(() => { const d = Object.getOwnPropertyDescriptor(Location.prototype, 'href'); Object.defineProperty(location, 'href', { set: (v) => { window.__mailto = v }, get: () => d.get.call(location) }) }).catch(() => {})
await page.click('button[type=submit]')
await page.waitForTimeout(300)
mail = await page.evaluate(() => document.querySelector('#quote-form').dataset.mailto ?? '')
const noteShown = await page.evaluate(() => !document.querySelector('#quote-note').hidden)
console.log('form: empty submit blocked =', blocked, '| mailto =', decodeURIComponent(mail).slice(0, 160).replace(/\n/g, ' / '), '| confirmation shown =', noteShown)
// every link
const results = []
for (const l of links) {
  if (!l.startsWith('http')) { results.push(`skip ${l.slice(0, 40)}`); continue }
  const r = await fetch(l, { method: 'GET', redirect: 'follow' }).catch((e) => ({ status: String(e) }))
  results.push(`${r.status} ${l}`)
}
console.log(results.filter((x) => !x.startsWith('200') && !x.startsWith('skip')).join('\n') || `all ${results.filter((x) => x.startsWith('200')).length} http links 200 (${results.filter((x) => x.startsWith('skip')).length} mailto/tel)`)
console.log('console errors:', errors.length ? errors : 0, '| failed responses:', bad.length ? bad : 0)
await browser.close()
