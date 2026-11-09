import './engine/scrollcraft.css'
import './engine/scrollcraft.js'
import './styles/base.css'
import './styles/pages.css'

declare global { interface Window { ScrollCraft: { mount: (root: Element) => unknown } } }

// Pick the lightest codec this browser can decode before the engine reads data-sc-src. The engine itself is untouched.
const probe = document.createElement('video')
const ext = probe.canPlayType('video/mp4; codecs="av01.0.05M.08"') ? '.av1.mp4'
  : probe.canPlayType('video/mp4; codecs="hvc1.1.6.L93.B0"') ? '.hevc.mp4' : '.mp4'
document.querySelectorAll<HTMLVideoElement>('video[data-sc-src]').forEach((v) => {
  for (const a of ['data-sc-src', 'data-sc-src-mobile']) {
    const s = v.getAttribute(a)
    if (s) v.setAttribute(a, s.replace(/\.mp4$/, ext))
  }
})
document.querySelectorAll<HTMLAnchorElement>('.bar__nav a').forEach((a) => {
  if (a.pathname === location.pathname.replace(/\.html$/, '')) a.setAttribute('aria-current', 'page')
})

// Quote form: compose an email in the visitor's own mail app. Nothing is stored or sent by this site.
const form = document.querySelector<HTMLFormElement>('#quote-form')
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (!form.reportValidity()) return
    const d = new FormData(form)
    const val = (k: string) => String(d.get(k) ?? '').trim()
    const products = d.getAll('product').map(String).join(', ') || 'Not specified'
    const body = [
      `Name: ${val('name')}`, `Company: ${val('company')}`, `Email: ${val('email')}`, `Phone: ${val('phone')}`,
      `Country / destination port: ${val('port')}`, `Products: ${products}`, `Form and quantity: ${val('details')}`, '',
      val('message'),
    ].join('\n')
    const subject = `Quote request: ${products}${val('company') ? ` (${val('company')})` : ''}`
    location.href = `mailto:info@skylarkexim.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    const note = document.querySelector<HTMLElement>('#quote-note')
    if (note) { note.hidden = false; note.focus() }
  })
}

window.ScrollCraft.mount(document.body)
