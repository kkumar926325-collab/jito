// Jito offline cache. Game update karo to CACHE ka number badal dena (v1 -> v2)
const CACHE = 'jito-v1';
const FILES = ['./', './index.html', './three.min.js', './manifest.json', './icon-192.png', './icon-512.png'];

// Install: sab files phone me save karo
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

// Activate: purana cache hata do
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Fetch: pehle saved file do, nahi mili to internet se lo
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request)));
});
