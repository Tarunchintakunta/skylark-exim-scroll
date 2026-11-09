"""Writes the sub-pages once. Shared head/bar/footer, each page's own body. Re-run after editing this file."""
SITE = 'https://skylark-exim-scroll.vercel.app'
def head(title, desc, path):
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title}</title>
<meta name="description" content="{desc}">
<link rel="canonical" href="{SITE}{path}">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:image" content="{SITE}/og.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0b0f12">
<link rel="icon" href="/favicon.png" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preload" href="/fonts/inter-tight-latin-500-normal.woff2" as="font" type="font/woff2" crossorigin>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="bar">
  <a class="bar__mark" href="/" aria-label="Skylark Exim, home"><img src="/logo-128.webp" width="40" height="40" alt=""><span>Skylark Exim</span></a>
  <nav class="bar__nav" aria-label="Site"><a href="/products">Products</a><a href="/about">About</a><a href="/news">News</a></nav>
  <a class="btn btn--accent bar__cta" href="/contact">Request a quote</a>
</header>
'''
FOOT = '''<footer class="foot">
  <div class="wrap">
    <p>Skylark Exim · Sheela Nagar, Visakhapatnam, Andhra Pradesh</p>
    <p><a href="tel:+919000604070">+91 90006 04070</a> · <a href="tel:+919885827318">+91 98858 27318</a> · <a href="mailto:info@skylarkexim.com">info@skylarkexim.com</a></p>
    <p><a href="/">Story</a> · <a href="/products">Products</a> · <a href="/about">About</a> · <a href="/news">News</a> · <a href="/contact">Contact</a></p>
  </div>
</footer>
<script type="module" src="/src/pages.ts"></script>
</body>
</html>
'''
FISH = [('tuna','Tuna'),('swordfish','Swordfish'),('seer-fish','Seer Fish'),('indian-mackerel','Indian Mackerel'),('ribbon-fish','Ribbon Fish'),('leatherjacket','Leatherjacket'),('squid','Squid'),('cuttlefish','Cuttlefish')]
SHRIMP = [('vannamei','Vannamei'),('black-tiger-shrimp','Black Tiger Shrimp'),('sea-white-shrimp','Sea White Shrimp'),('sea-tiger-shrimp','Sea Tiger Shrimp'),('pink-brown','Pink / Brown')]
def obj(slug, name, group, origin):
    return f'''<article class="obj" id="{slug}" data-sc-in>
  <figure data-sc-tilt="5"><picture><source type="image/avif" srcset="/media/products/{slug}_480.avif 480w, /media/products/{slug}_960.avif 960w" sizes="(max-width: 600px) 92vw, 320px"><img src="/media/products/{slug}_480.webp" srcset="/media/products/{slug}_480.webp 480w, /media/products/{slug}_960.webp 960w" sizes="(max-width: 600px) 92vw, 320px" width="480" height="480" alt="{name} on crushed ice" loading="lazy" decoding="async"></picture></figure>
  <h3>{name}</h3>
  <dl class="label"><dt>Group</dt><dd>{group}</dd><dt>States</dt><dd>Raw fresh · Chilled · Frozen</dd></dl>
</article>'''
products = head('Products · Skylark Exim', 'Marine fish and shrimp from Skylark Exim, Visakhapatnam: raw fresh, chilled and frozen. Vannamei and Black Tiger in six forms.', '/products') + f'''<main id="main" class="page">
<div class="wrap">
  <div class="ph" data-sc-in data-sc-stagger="60">
    <p class="eyebrow">Products</p>
    <h1>Marine fish and shrimp, raw fresh, chilled or frozen.</h1>
    <p class="lede">Every item below ships from our processing unit at Anandapuram, Visakhapatnam. Tell us the species, the form and the port, and we will quote.</p>
  </div>
  <nav class="index" aria-label="Product index">{' '.join(f'<a href="#{s}">{n}</a>' for s,n in SHRIMP+FISH)}</nav>
  <section class="group" aria-labelledby="g-shrimp">
    <h2 id="g-shrimp">Shrimp</h2>
    <div class="objects">{''.join(obj(s,n,'Shrimp','Partner farms' if s in ('vannamei','black-tiger-shrimp') else 'Farms or fishing vessels') for s,n in SHRIMP)}</div>
    <table class="forms">
      <caption class="sr-only">Shrimp forms</caption>
      <thead><tr><th scope="col">Form</th><th scope="col">Species or option</th></tr></thead>
      <tbody>
        <tr><td>Head-on shell-on</td><td>Vannamei · Black Tiger</td></tr>
        <tr><td>Headless shell-on</td><td>Vannamei · Black Tiger</td></tr>
        <tr><td>Peeled undeveined</td><td>Vannamei</td></tr>
        <tr><td>Peeled and deveined</td><td>Tail on · Tail off</td></tr>
        <tr><td>Pin deveined</td><td>Tail on · Tail off</td></tr>
        <tr><td>Easy peel</td><td>Vannamei · Black Tiger</td></tr>
      </tbody>
    </table>
  </section>
  <section class="group" aria-labelledby="g-fish">
    <h2 id="g-fish">Marine fish</h2>
    <div class="objects">{''.join(obj(s,n,'Marine fish','Fishing vessels') for s,n in FISH)}</div>
  </section>
  <div class="ask"><p>Packed in export-grade cartons, vacuum packs or custom packaging, to your order.</p><a class="btn btn--accent" href="/contact">Request a quote</a></div>
</div>
</main>
''' + FOOT
about = head('About · Skylark Exim', 'Skylark Exim is a seafood exporter in Visakhapatnam, Andhra Pradesh, with a processing unit and lab unit at Anandapuram and 700 pallets of cold storage.', '/about') + '''<main id="main" class="page">
<div class="wrap">
  <div class="ph" data-sc-in data-sc-stagger="60">
    <p class="eyebrow">About</p>
    <h1>A seafood exporter in Visakhapatnam, in control from sourcing to delivery.</h1>
  </div>
  <div class="prose" data-sc-in data-sc-stagger="60">
    <p>Skylark Exim, based in Visakhapatnam, Andhra Pradesh, is a trusted seafood exporter specialising in premium raw fresh, chilled and frozen seafood. With a fully integrated value chain, we ensure complete control over quality, consistency and sustainability at every stage, from sourcing to delivery.</p>
    <p>Our commitment to excellence is powered by advanced processing facilities, innovative technology, and strict adherence to international quality standards. Through strategic partnerships with aquaculture farmers and a focus on responsible sourcing, we guarantee superior freshness, traceability, and product integrity across all markets.</p>
    <p>Today, Skylark Exim is recognised as one of India's leading and globally trusted shrimp exporters, delivering world-class seafood solutions to customers worldwide.</p>
  </div>
</div>
<section class="film-act" data-sc-act="scrub" data-sc-span="2.2" data-sc-dwell="0.3" aria-label="Inside the processing hall">
  <div data-sc-stage>
    <picture><source media="(max-width: 760px)" srcset="/media/video/hf-wash-poster-m.webp"><img class="sc-stage__poster" src="/media/video/hf-wash-poster.webp" alt="" width="1600" height="900"></picture>
    <video data-sc-scrub data-sc-src="/media/video/hf-wash.mp4" data-sc-src-mobile="/media/video/hf-wash-m.mp4" muted playsinline aria-hidden="true"></video>
    <div class="sc-scrim sc-scrim--lead" aria-hidden="true"></div>
    <div class="sc-copy sc-copy--lead" data-sc-cue="0.08 0.92">
      <h2 class="sc-display sc-display--lg">The processing unit at Anandapuram.</h2>
      <p class="sc-body">A state-of-the-art shrimp processing facility equipped with internationally acclaimed modernised equipment.</p>
    </div>
  </div>
</section>
<div class="wrap">
  <div class="facts">
    <div data-sc-in><p class="big"><span data-sc-count="0 700">700</span></p><p>pallets: the total storage capacity of our warehouse, held in cold rooms at −18&nbsp;°C to −20&nbsp;°C until dispatch.</p></div>
    <div data-sc-in><p class="lede">Our unit at Anandapuram, Visakhapatnam has a processing unit and a lab unit. Compliance with export certificates (HACCP, EU, FDA, etc.).</p></div>
  </div>
  <div class="two">
    <div data-sc-in><h2>Vision</h2><p>To be a trusted global leader in the seafood export industry by delivering premium-quality, sustainably sourced seafood to international markets, while building long-term partnerships, supporting coastal communities, and promoting responsible fishing practices for future generations.</p></div>
    <div data-sc-in><h2>Mission</h2><p>To deliver premium-quality seafood to global markets while ensuring sustainability, freshness and customer satisfaction. We are committed to long-term relationships with our clients, with the highest standards of hygiene, ethical sourcing and timely delivery.</p></div>
  </div>
  <section class="group" aria-labelledby="why">
    <h2 id="why">Why buyers work with us</h2>
    <ul class="reasons">
      <li data-sc-in><h3>Prompt delivery</h3><p>Competent people for accurate order handling and prompt delivery.</p></li>
      <li data-sc-in><h3>Documentation staff</h3><p>Our documentation staff prepare all necessary documents and track every shipment's logistics.</p></li>
      <li data-sc-in><h3>Quality control staff</h3><p>For our clients, our quality control staff guarantee top-notch quality.</p></li>
      <li data-sc-in><h3>Farmer partnerships</h3><p>Strategic partnerships with aquaculture farmers and a focus on responsible sourcing.</p></li>
    </ul>
  </section>
  <section class="people" aria-labelledby="ppl"><h2 id="ppl">Managing partners</h2><ul><li>V. Yashod Kumar</li><li>N.V. Prudhvi</li></ul></section>
  <div class="ask"><p>Read the full company profile, or ask us directly.</p><div class="checks"><a class="btn btn--ghost" href="/docs/skylark-exim-company-profile.pdf">Company profile (PDF)</a><a class="btn btn--accent" href="/contact">Request a quote</a></div></div>
</div>
</main>
''' + FOOT
checks = ''.join(f'<label><input type="checkbox" name="product" value="{n}"> {n}</label>' for _,n in SHRIMP+FISH)
contact = head('Request a quote · Skylark Exim', 'Request an export quote from Skylark Exim, Visakhapatnam. Shrimp and marine fish, raw fresh, chilled or frozen.', '/contact') + f'''<main id="main" class="page">
<div class="wrap">
  <div class="ph" data-sc-in data-sc-stagger="60">
    <p class="eyebrow">Contact</p>
    <h1 id="quote">Request a quote.</h1>
    <p class="lede">Tell us what you need and where it is going. The form opens your own email app with the request written out, addressed to info@skylarkexim.com.</p>
  </div>
  <div class="contact">
    <noscript><style>#quote-form{{display:none}}</style><p class="note">The form needs JavaScript to write the email for you. Send your request to <a href="mailto:info@skylarkexim.com">info@skylarkexim.com</a> or call <a href="tel:+919000604070">+91 90006 04070</a>.</p></noscript>
    <form id="quote-form" method="post">
      <div class="row">
        <label>Name<input name="name" autocomplete="name" required></label>
        <label>Company<input name="company" autocomplete="organization"></label>
      </div>
      <div class="row">
        <label>Email<input name="email" type="email" autocomplete="email" required></label>
        <label>Phone<input name="phone" type="tel" autocomplete="tel"></label>
      </div>
      <label>Country and destination port<input name="port" required></label>
      <fieldset><legend>Products</legend><div class="checks">{checks}</div></fieldset>
      <label>Form, packing and quantity<input name="details" placeholder="e.g. Vannamei, headless shell-on, frozen"></label>
      <label>Message<textarea name="message"></textarea></label>
      <div><button class="btn btn--accent" type="submit">Request a quote</button></div>
      <p id="quote-note" class="note" tabindex="-1" hidden>Your email app should now be open with the request filled in. If nothing opened, write to <a href="mailto:info@skylarkexim.com">info@skylarkexim.com</a>.</p>
    </form>
    <aside class="side">
      <div><h2>Email</h2><a href="mailto:info@skylarkexim.com">info@skylarkexim.com</a></div>
      <div><h2>Phone</h2><a href="tel:+919000604070">+91 90006 04070</a><br><a href="tel:+919885827318">+91 98858 27318</a></div>
      <div><h2>Office</h2><address>Sheela Nagar, Visakhapatnam, Andhra Pradesh</address></div>
      <div><h2>Processing unit</h2><address>Abad Overseas Private Limited, S.No. 297/Part, Lodagalavanipalem, Anandapuram-Pendurthi Road, Anandapuram, Visakhapatnam-530052, Andhra Pradesh</address></div>
      <div><a class="btn btn--ghost" href="/docs/skylark-exim-company-profile.pdf">Company profile (PDF)</a></div>
    </aside>
  </div>
</div>
</main>
''' + FOOT
news = head('News and updates · Skylark Exim', 'News and updates from Skylark Exim, seafood exporter in Visakhapatnam.', '/news') + '''<main id="main" class="page">
<div class="wrap">
  <div class="ph" data-sc-in data-sc-stagger="60">
    <p class="eyebrow">News and updates</p>
    <h1>No updates published yet.</h1>
    <p class="lede">Shipments, new products and plant news will be posted here. For anything current, ask us directly.</p>
    <div><a class="btn btn--accent" href="/contact">Request a quote</a></div>
  </div>
</div>
</main>
''' + FOOT
nf = head('Page not found · Skylark Exim', 'This page does not exist.', '/404').replace('<link rel="canonical" href="https://skylark-exim-scroll.vercel.app/404">', '<meta name="robots" content="noindex">') + '''<main id="main" class="page">
<div class="wrap">
  <div class="ph">
    <p class="eyebrow">404</p>
    <h1>This page is not on the route.</h1>
    <p class="lede">The address may have changed. Start the story again, or go straight to products.</p>
    <div class="checks"><a class="btn btn--accent" href="/">Back to the story</a><a class="btn btn--ghost" href="/products">Products</a></div>
  </div>
</div>
</main>
''' + FOOT
for n, s in [('products', products), ('about', about), ('contact', contact), ('news', news), ('404', nf)]:
    open(f'{n}.html', 'w').write(s)
print('ok')
