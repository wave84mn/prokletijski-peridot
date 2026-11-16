/* Prokletijski Peridot · offline (fix plan step 5, 16 Nov 2026). Written by build.py: VERSION and FILES are filled in.
   Pages (index.html, field.html) come from the network first, so a new version arrives as soon as there is signal; everything
   else comes from the phone first. "Ready for the mountains" (Before you go) asks this worker to save every file of the game
   while the phone is on Wi-Fi, so the valleys can be played with no signal. Fonts from Google Fonts are kept too. */
const VERSION = '337b7ec6d2';
const FILES = ["", "catch/ari.jpg", "catch/kissing-cats.webp", "catch/meyra-face.jpg", "catch/meyra.jpg", "field.html", "fieldmap/grebaje.webp", "fieldmap/gusinje.webp", "fieldmap/overview.jpg", "fieldmap/vusanje.webp", "icons/apple-touch-icon.png", "icons/icon-192.png", "icons/icon-512.png", "icons/icon-maskable-512.png", "index.html", "landing/frame.webp", "landing/menu-legend.jpg", "landing/menu-mine.jpg", "landing/menu-ready.jpg", "landing/night-tall.jpg", "landing/night-wide.jpg", "landing/trail.jpg", "logo.png", "logo/peridot-1k.jpg", "logo/peridot-2k.jpg", "logo/peridot-badge-hd.png", "logo/peridot-badge-sm.png", "logo/peridot-badge.png", "logo/peridot-mesh.txt", "logo/peridot-orm.jpg", "manifest.webmanifest", "partners/ministarstvo-turizma.png", "partners/to-gusinje.png", "partners/xplore-prokletije.png", "vendor/three.module.js"];
const CACHE = `peridot-${VERSION}`, FONTS = 'peridot-fonts';
const CORE = ['./', 'index.html', 'field.html', 'manifest.webmanifest'];
const abs = (f) => new URL(f, self.registration.scope).href;
const bare = (url) => { const u = new URL(url); u.search = ''; u.hash = ''; return u.href; };

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await Promise.all(CORE.map((f) => fetch(abs(f), { cache: 'no-cache' }).then((r) => r.ok && c.put(abs(f), r)).catch(() => {})));
    await self.skipWaiting();
  })());
});
self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k.startsWith('peridot-') && k !== CACHE && k !== FONTS) await caches.delete(k);
    await self.clients.claim();
  })());
});

const timeout = (p, ms) => Promise.race([p, new Promise((_, no) => setTimeout(() => no(new Error('timeout')), ms))]);
async function networkFirst(req) {   // pages: the newest when there is signal, the saved one when there is not
  const c = await caches.open(CACHE);
  try {
    const r = await timeout(fetch(req), 6000);
    if (r.ok) c.put(bare(req.url), r.clone());
    return r;
  } catch {
    const hit = await c.match(req, { ignoreSearch: true }) || (req.mode === 'navigate' ? await c.match(abs('index.html')) : null);
    if (hit) return hit;
    throw new Error('offline and not saved');
  }
}
async function cacheFirst(req) {   // pictures, the map, three.js: from the phone when saved
  const c = await caches.open(CACHE);
  const hit = await c.match(req, { ignoreSearch: true });
  if (hit) return hit;
  const r = await fetch(req);
  if (r.ok) c.put(bare(req.url), r.clone());
  return r;
}
async function fontFirst(req) {
  const c = await caches.open(FONTS);
  const hit = await c.match(req);
  if (hit) return hit;
  const r = await fetch(req);
  if (r.ok || r.type === 'opaque') c.put(req, r.clone());
  return r;
}
self.addEventListener('fetch', (e) => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.hostname === 'fonts.gstatic.com' || url.hostname === 'fonts.googleapis.com') { e.respondWith(fontFirst(req)); return; }
  if (url.origin !== self.location.origin || !url.pathname.startsWith(new URL(self.registration.scope).pathname)) return;
  const page = req.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname.endsWith('/') || url.pathname.endsWith('.webmanifest');
  e.respondWith(page ? networkFirst(req) : cacheFirst(req));
});

// "Ready for the mountains": save every file, with progress for the page
self.addEventListener('message', (e) => {
  if (e.data?.type !== 'ready') return;
  const port = e.ports[0];
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    let n = 0, failed = 0, bytes = 0;
    for (const f of FILES) {
      try {
        const r = await fetch(abs(f), { cache: 'no-cache' });
        if (!r.ok) throw new Error(r.status);
        bytes += (await r.clone().blob()).size;
        await c.put(abs(f), r);
      } catch { failed++; }
      n++; port?.postMessage({ type: 'progress', n, m: FILES.length });
    }
    port?.postMessage({ type: 'done', n, failed, bytes, version: VERSION });
  })());
});
