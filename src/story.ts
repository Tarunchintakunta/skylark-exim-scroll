import { ROUTES, MARKETS, ORIGIN, type Chapter, type Route } from './chapters'
import './styles/base.css'
import './styles/story.css'

/**
 * One fixed canvas for the whole story (continuous-world grammar, frame-sequence variant).
 * Scroll position maps straight to a frame index every animation frame: no lerp, no smoothing, same rule up and down.
 * Chapters crossfade one-sided at their seams (the incoming frame fades in over the outgoing one, which holds).
 */

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches
const SEAM = 0.12 // vh of crossfade between chapters
const INNER = 0.08 // vh of crossfade between clips inside a chapter

const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector(s) as T
const html = document.documentElement
history.scrollRestoration = 'manual'

// ---------- route + layout ----------
let route: Route = location.hash === '#pond' ? 'pond' : 'sea'
let chapters: Chapter[] = ROUTES[route]
let starts: number[] = []
let total = 0
let vh = innerHeight

const track = $('#track')
const stage = $('.stage')
const canvas = $<HTMLCanvasElement>('#film')
const ctx = canvas.getContext('2d', { alpha: false })!
const hero = $('.hero')
const scrim = $('.scrim')
const world = $('.world')

function layout() {
  vh = innerHeight
  starts = []
  total = 0
  for (const ch of chapters) { starts.push(total); total += ch.span }
  const secs = track.querySelectorAll<HTMLElement>('section.ch')
  if (!reduced) secs.forEach((s, i) => { s.style.height = `${Math.round((chapters[i].span + (i === chapters.length - 1 ? 1 : 0)) * vh)}px` })
  const dpr = Math.min(devicePixelRatio || 1, 2)
  canvas.width = Math.round(innerWidth * dpr)
  canvas.height = Math.round(innerHeight * dpr)
  last = ''
}

// ---------- copy (real markup, built per route) ----------
function esc(s: string) { return s.replace(/[&<>"]/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]!)) }
function lines(t: string) { return t.split(/(?<=[.,:]) /).map((l) => `<span class="ln"><span>${esc(l)}</span></span>`).join(' ') }

function buildTrack() {
  track.innerHTML = chapters.map((ch, i) => {
    const caps = ch.caps.map((c, k) => `
      <div class="cap cap--${ch.side ?? 'lead'}" data-ch="${i}" data-k="${k}" data-sc-cue="${c.at.join(' ')}">
        <h2 class="cap__title">${lines(c.title)}</h2>
        ${c.body ? `<p class="cap__body">${esc(c.body)}</p>` : ''}
        ${c.extra === 'count700' ? `<p class="cap__fig"><span class="num" data-to="700">700</span> pallets of warehouse capacity</p>` : ''}
        ${c.extra === 'docs' ? `<ul class="docs"><li>Export documents</li><li>Certificates: HACCP, EU, FDA, etc.</li><li>Shipment tracking</li></ul>` : ''}
      </div>`).join('')
    const poster = posterFor(ch)
    return `<section class="ch" id="${ch.id}" data-sc-act="flow" aria-label="${esc(ch.station)}">
      ${poster ? `<img class="ch__poster" src="${poster}" alt="" loading="lazy" decoding="async">` : ''}${caps}</section>`
  }).join('')
}

function posterFor(ch: Chapter) {
  if (ch.still) return `/media/stills/${ch.still}_${portrait() ? 'm' : '1920'}.${fmt}`
  const clip = ch.clips[Math.min(ch.clips.length - 1, 1)] ?? ch.clips[0]
  return clip ? frameUrl(clip.id, Math.floor(clip.frames / 2)) : ''
}

// ---------- route rail (the signature move) ----------
const rail = $('.route')
function buildRail() {
  const other: Route = route === 'sea' ? 'pond' : 'sea'
  rail.innerHTML = `
    <div class="route__fork" role="group" aria-label="Choose the origin">
      <a href="#sea" class="route__origin" data-route="sea" aria-current="${route === 'sea'}">Sea catch</a>
      <a href="#pond" class="route__origin" data-route="pond" aria-current="${route === 'pond'}">Farmed shrimp</a>
      <svg class="route__y" viewBox="0 0 40 28" aria-hidden="true"><path d="M6 0 C6 14 20 12 20 28" class="${route === 'sea' ? 'on' : ''}"/><path d="M34 0 C34 14 20 12 20 28" class="${route === 'pond' ? 'on' : ''}"/></svg>
    </div>
    <ol class="route__stations">
      ${chapters.map((ch, i) => `<li><button type="button" data-go="${i}"><span class="dot"></span><span class="lbl">${ch.station}</span></button></li>`).join('')}
    </ol>
    <div class="route__now" aria-live="polite"><span class="route__name"></span><a class="route__switch" href="#${other}">${other === 'pond' ? 'Farmed shrimp' : 'Sea catch'} route</a></div>
    <div class="route__line" aria-hidden="true"><i></i></div>`
}
rail.addEventListener('click', (e) => {
  const t = e.target as HTMLElement
  const go = t.closest<HTMLElement>('[data-go]')
  if (go) {
    const k = +go.dataset.go!
    const sec = track.querySelectorAll<HTMLElement>('section.ch')[k]
    scrollTo({ top: sec.offsetTop + (reduced || !k ? 0 : Math.ceil(SEAM * vh)) + 2, behavior: 'instant' as ScrollBehavior })
    return
  }
  const r = t.closest<HTMLAnchorElement>('[data-route],.route__switch')
  if (r) { e.preventDefault(); setRoute((r.getAttribute('href') ?? '').slice(1) as Route) }
})
addEventListener('hashchange', () => { const r = location.hash.slice(1); if (r === 'sea' || r === 'pond') setRoute(r) })

function heroTitle() { $('.hero__title .ln span').textContent = route === 'pond' ? 'From the pond to your port,' : 'From the boat to your port,' }
function setRoute(r: Route) {
  if (r !== 'sea' && r !== 'pond') return
  if (r === route && chapters === ROUTES[r]) return
  route = r
  history.replaceState(null, '', `#${r}`)
  chapters = ROUTES[r]
  html.dataset.route = r
  heroTitle()
  buildTrack(); buildRail(); layout(); queueAll()
  scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  last = ''
}

// ---------- frame cache ----------
let fmt: 'avif' | 'webp' = 'webp'
const portrait = () => innerWidth / innerHeight < 0.8
const frameUrl = (id: string, i: number) => `/media/seq/${id}/${portrait() ? 'm' : 'd'}/${String(i).padStart(2, '0')}.${fmt}`
const cache = new Map<string, HTMLImageElement>()
const stats = { need: 0, miss: 0, blank: 0 }
;(window as unknown as { __sc: unknown }).__sc = { stats, cache, chapters: () => chapters, starts: () => starts }
const pending = new Set<string>()
let queue: string[] = []

/** frame indices of one clip at a given coarseness (every `step`th frame, always including the last) */
function every(n: number, step: number) {
  const out: number[] = []
  for (let i = 0; i < n; i += step) out.push(i)
  if (out[out.length - 1] !== n - 1) out.push(n - 1)
  return out
}
function chapterUrls(i: number, step: number) {
  const ch = chapters[i]; if (!ch) return []
  if (ch.still) return [posterFor(ch)]
  return ch.clips.flatMap((cl) => every(cl.frames, step).map((k) => frameUrl(cl.id, k)))
}
let queuedFor = -1
/**
 * Priority, coarse to fine so a fast scroll on a cold cache always has a nearby real frame:
 * current + next chapter every 8th frame, then every 4th (+ the chapter behind), then every frame,
 * then the rest of the route outward, again coarse before fine.
 */
function queueAll(cur = chapterAt(scrollY / vh)) {
  queuedFor = cur
  const near = [cur, cur + 1]
  const rest = chapters.map((_, i) => i).filter((i) => !near.includes(i)).sort((a, b) => Math.abs(a - cur) - Math.abs(b - cur) || b - a)
  const tiers: [number[], number][] = [[near, 8], [[...near, cur - 1], 4], [[...near, cur - 1], 2], [[...near, cur - 1], 1], [rest, 8], [rest, 4], [rest, 1]]
  const seen = new Set<string>(); queue = []
  for (const [ix, step] of tiers) for (const i of ix) for (const u of chapterUrls(i, step)) if (!seen.has(u) && !cache.has(u)) { seen.add(u); queue.push(u) }
  pump()
}
const MAX = 10
function pump() {
  while (pending.size < MAX && queue.length) {
    const u = queue.shift()!
    if (cache.has(u) || pending.has(u)) continue
    pending.add(u)
    const img = new Image()
    img.decoding = 'async'
    img.src = u
    img.decode().then(() => { cache.set(u, img); last = '' }, () => {}).finally(() => { pending.delete(u); pump() })
  }
}
function nearest(id: string, k: number, n: number) {
  for (let d = 0; d < n; d++) {
    const a = cache.get(frameUrl(id, k - d)); if (a && k - d >= 0) return a
    const b = cache.get(frameUrl(id, k + d)); if (b && k + d < n) return b
  }
  return null
}

// ---------- drawing ----------
function cover(img: HTMLImageElement, alpha: number, scale = 1) {
  const cw = canvas.width, chh = canvas.height
  const s = Math.max(cw / img.naturalWidth, chh / img.naturalHeight) * scale
  const w = img.naturalWidth * s, h = img.naturalHeight * s
  ctx.globalAlpha = alpha
  ctx.drawImage(img, (cw - w) / 2, (chh - h) / 2, w, h)
}

interface Shot { img: HTMLImageElement | null; key: string; scale: number }
/** what chapter i shows at local progress p (0..1) */
function shotsFor(i: number, p: number): { a: Shot; b?: Shot; mix: number } {
  const ch = chapters[i]
  if (ch.still) {
    const img = cache.get(posterFor(ch)) ?? null
    return { a: { img, key: `s${i}:${Math.round(p * 400)}`, scale: 1.02 + 0.06 * p }, mix: 0 }
  }
  if (!ch.clips.length) return { a: { ...shotsFor(i - 1, 1).a }, mix: 0 } // the world holds the ship's last frame under the map
  let q = p
  if (ch.id === 'harbour') q = Math.max(0, (p - 0.55) / 0.45) // frame 1 holds under the hero planes, then the boat moves off
  const n = ch.clips.length
  const pos = Math.min(q * n, n - 1e-6)
  const j = Math.floor(pos), local = pos - j
  const shot = (jj: number, lp: number): Shot => {
    const cl = ch.clips[jj]; const k = Math.round(Math.min(1, Math.max(0, lp)) * (cl.frames - 1))
    const img = nearest(cl.id, k, cl.frames)
    // diagnostics for the verification pass: how often the exact frame was not decoded yet when it was needed
    const exact = !!img && img.src.endsWith(frameUrl(cl.id, k))
    stats.need++; if (!exact) stats.miss++; if (!img) stats.blank++
    return { img, key: `${cl.id}:${k}`, scale: ch.id === 'harbour' ? 1.06 : 1 }
  }
  const a = shot(j, local)
  const band = INNER / (ch.span / n) // the inner seam in clip-local units
  if (j < n - 1 && local > 1 - band) return { a, b: shot(j + 1, 0), mix: (local - (1 - band)) / band }
  return { a, mix: 0 }
}

function chapterAt(t: number) {
  let i = 0
  while (i < chapters.length - 1 && t >= starts[i + 1]) i++
  return i
}

let last = ''
let heroH = 0
function frame() {
  const t = scrollY / vh
  const i = chapterAt(t)
  if (i !== queuedFor) queueAll(i)
  const ch = chapters[i]
  const p = Math.min(1, Math.max(0, (t - starts[i]) / ch.span))
  const cur = shotsFor(i, p)
  // one-sided seam into the next chapter
  const next = i < chapters.length - 1 ? starts[i + 1] : Infinity
  const seamMix = t > next - SEAM ? (t - (next - SEAM)) / SEAM : 0
  const nxt = seamMix > 0 ? shotsFor(i + 1, 0) : null

  // hero planes (sea route only)
  heroH = i === 0 ? Math.min(1, p / 0.6) : 1
  const worldP = ch.id === 'world' ? p : 0
  const sig = `${i}|${cur.a.key}|${cur.b?.key ?? ''}|${cur.mix.toFixed(3)}|${nxt?.a.key ?? ''}|${seamMix.toFixed(3)}|${heroH.toFixed(3)}|${cur.a.img ? 1 : 0}`
  if (sig !== last) {
    last = sig
    if (cur.a.img) { cover(cur.a.img, 1, cur.a.scale) }
    if (cur.b?.img && cur.mix > 0) cover(cur.b.img, cur.mix, cur.b.scale)
    if (nxt && nxt.a.img) cover(nxt.a.img, seamMix, nxt.a.scale)
    ctx.globalAlpha = 1
    stage.dataset.scVerifyState = `${i}:${cur.a.key}:${cur.b?.key ?? '-'}:${cur.mix.toFixed(2)}:${seamMix.toFixed(2)}:${heroH.toFixed(2)}`
  }
  const side = ch.caps.length ? ch.side ?? 'lead' : 'lead'
  if (html.dataset.capSide !== side) html.dataset.capSide = side
  paintHero(heroH)
  paintCaps(t)
  paintWorld(ch.id === 'world' ? worldP : (i === chapters.length - 2 && seamMix > 0 ? 0 : -1))
  paintRail(t, i)
  requestAnimationFrame(frame)
}

// ---------- hero planes ----------
const planes = hero ? [...hero.querySelectorAll<HTMLElement>('[data-depth]')] : []
let mx = 0, my = 0, pmx = 0, pmy = 0
if (fine && !reduced) addEventListener('pointermove', (e) => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5 }, { passive: true })
let lastHero = -1
function paintHero(h: number) {
  if (!hero) return
  pmx += (mx - pmx) * 0.08; pmy += (my - pmy) * 0.08 // pointer only: a light settle, scroll stays direct
  const key = h + pmx * 1e-3 + pmy * 1e-6
  if (key === lastHero) return
  lastHero = key
  const show = h < 1
  hero.style.visibility = show ? 'visible' : 'hidden'
  scrim.style.opacity = String(h)
  if (!show) return
  hero.style.opacity = String(h < 0.72 ? 1 : 1 - (h - 0.72) / 0.28)
  for (const el of planes) {
    const d = parseFloat(el.dataset.depth!)
    const s = reduced ? 1 : 1 + d * 0.22 * h
    const ty = reduced ? 0 : d * d * 9 * h
    const px = reduced ? 0 : -pmx * d * 22, py = reduced ? 0 : -pmy * d * 12
    el.style.transform = `translate3d(${px}px, calc(${ty}vh + ${py}px), 0) scale(${s})`
  }
  if (!reduced) for (const el of [$('.hero__title', hero), $('.hero__copy', hero)]) {
    el.style.transform = `translate3d(0, ${-6 * h}vh, 0)`
    el.style.opacity = String(Math.max(0, 1 - h * 1.7))
  }
}

// ---------- captions ----------
function capOpacity(p: number, a: number, b: number) {
  const r = Math.min(0.08, (b - a) * 0.2)
  if (p <= a || p >= b) return 0
  if (p < a + r) return (p - a) / r
  if (p > b - r) return (b - p) / r
  return 1
}
const counted = new WeakSet<Element>()
function paintCaps(t: number) {
  if (reduced) return
  track.querySelectorAll<HTMLElement>('.cap').forEach((el) => {
    const i = +el.dataset.ch!, k = +el.dataset.k!
    const ch = chapters[i]; const c = ch.caps[k]
    const p = (t - starts[i]) / ch.span
    const o = capOpacity(p, c.at[0], c.at[1])
    const prev = el.style.opacity
    const v = o.toFixed(3)
    if (prev === v) return
    el.style.opacity = v
    el.style.visibility = o > 0 ? 'visible' : 'hidden'
    el.style.transform = `translate3d(0, ${(1 - Math.min(1, (p - c.at[0]) / (c.at[1] - c.at[0])) * 2) * 1.2}vh, 0)`
    el.classList.toggle('on', o > 0.02)
    if (o > 0.5) el.querySelectorAll('.num').forEach((n) => count(n as HTMLElement))
  })
}
function count(n: HTMLElement) {
  if (counted.has(n)) return
  counted.add(n)
  const to = +n.dataset.to!; const t0 = performance.now()
  const step = (now: number) => {
    const k = Math.min(1, (now - t0) / 1300); const e = 1 - Math.pow(1 - k, 3)
    n.textContent = Math.round(to * e).toLocaleString('en-IN')
    if (k < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

// ---------- the world ----------
function buildWorld() {
  // equirectangular crop: lon -20..150, lat -10..65 (Algeria to Japan, Sri Lanka to Russia)
  const X = (lon: number) => ((lon + 20) / 170) * 1000, Y = (lat: number) => ((65 - lat) / 75) * 441
  const ox = X(ORIGIN.lon), oy = Y(ORIGIN.lat)
  const arcs = MARKETS.map((m, k) => {
    const x = X(m.lon), y = Y(m.lat), mxp = (ox + x) / 2, myp = Math.min(oy, y) - Math.abs(x - ox) * 0.22 - 18
    return `<path d="M${ox.toFixed(1)} ${oy.toFixed(1)} Q${mxp.toFixed(1)} ${myp.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}" pathLength="1" style="--k:${k}"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.2" style="--k:${k}"/>`
  }).join('')
  const iw = 1000 / (170 / 360), ih = iw / 2
  const tex = `<image href="/textures/earth_day_2048.${fmt}" x="${(-(160 / 360) * iw).toFixed(1)}" y="${(-(25 / 180) * ih).toFixed(1)}" width="${iw.toFixed(1)}" height="${ih.toFixed(1)}" preserveAspectRatio="none"/>`
  $('.world__arcs', world).innerHTML = `${tex}${arcs}<circle class="o" cx="${ox.toFixed(1)}" cy="${oy.toFixed(1)}" r="5"/>`
  const regions = [...new Set(MARKETS.map((m) => m.region))]
  $('.world__list', world).innerHTML = regions.map((r) => `<li><span>${r}</span>${MARKETS.filter((m) => m.region === r).map((m) => m.name).join(', ')}</li>`).join('')
}
let lastWorld = -2
function paintWorld(p: number) {
  if (p === lastWorld) return
  lastWorld = p
  const on = p >= 0
  world.style.visibility = on ? 'visible' : 'hidden'
  world.style.opacity = on ? String(reduced ? 1 : Math.min(1, p / 0.18)) : '0'
  world.style.setProperty('--w', reduced ? '1' : Math.min(1, Math.max(0, (p - 0.1) / 0.5)).toFixed(3))
  world.toggleAttribute('data-hold', p >= 0.7)
  if (p > 0.15) world.querySelectorAll('.num').forEach((n) => count(n as HTMLElement))
  if (on) stage.dataset.scVerifyHold = p >= 0.7 ? 'true' : 'false'
  else delete stage.dataset.scVerifyHold
}

// ---------- rail ----------
let lastRail = ''
function paintRail(t: number, i: number) {
  const prog = Math.min(1, t / total)
  const key = `${i}|${prog.toFixed(3)}`
  if (key === lastRail) return
  lastRail = key
  rail.style.setProperty('--p', prog.toFixed(4))
  rail.querySelectorAll('li').forEach((li, k) => {
    li.classList.toggle('done', k < i || (k === i && t >= starts[k] + 0.05))
    li.querySelector('button')!.toggleAttribute('aria-current', k === i)
  })
  $('.route__name', rail).textContent = chapters[i].station
}

// ---------- boot ----------
async function pickFormat() {
  const avif = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A='
  fmt = await new Promise<'avif' | 'webp'>((res) => { const i = new Image(); i.onload = () => res(i.width > 0 ? 'avif' : 'webp'); i.onerror = () => res('webp'); i.src = avif })
}

async function boot() {
  html.dataset.route = route
  heroTitle()
  await pickFormat()
  buildTrack(); buildRail(); buildWorld(); layout()
  scrollTo(0, 0)
  if (reduced) {
    html.classList.add('sc-ready')
    // reduced motion: no film is fetched; each chapter shows one still in normal document flow
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) paintRail(starts[+(e.target as HTMLElement).dataset.i!], +(e.target as HTMLElement).dataset.i!) }), { rootMargin: '-45% 0px -45% 0px' })
    track.querySelectorAll<HTMLElement>('section.ch').forEach((s, i) => { s.dataset.i = String(i); io.observe(s) })
    paintRail(0, 0)
    return
  }
  queueAll(0)
  // the first frame of chapter 1 must be decoded before the stage is handed over
  const first = chapters[0].clips[0]
  const u = frameUrl(first.id, 0)
  const img = new Image(); img.src = u
  try { await img.decode(); cache.set(u, img) } catch { /* the hero planes still cover it */ }
  requestAnimationFrame(frame)
  html.classList.add('sc-ready')
}
let rw = innerWidth, rh = innerHeight
const coarse = matchMedia('(pointer: coarse)').matches
addEventListener('resize', () => {
  // a phone's URL bar changes the height on every scroll direction change: re-laying out then would jump the track
  if (coarse && innerWidth === rw) return
  const wasPortrait = rw / rh < 0.8
  rw = innerWidth; rh = innerHeight
  if (wasPortrait !== portrait()) { cache.clear(); buildTrack(); queueAll() }
  layout()
})
boot()
