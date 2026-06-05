const CACHE_NAME = 'croacia-2026-v3';
const ASSETS = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/apple-touch-icon.png",
  "icons/favicon-32.png",
  "icons/favicon-16.png",
  "icons/favicon.ico",
  "pdfs/belgrado.pdf",
  "pdfs/zagreb.pdf",
  "pdfs/pula.pdf",
  "pdfs/slunj.pdf",
  "pdfs/zadar.pdf",
  "pdfs/split.pdf",
  "pdfs/hvar.pdf",
  "pdfs/dubrovnik.pdf",
  "pdfs/seguro.pdf",
  "pdfs/coche.pdf",
  "pdfs/vuelta.pdf",
  "pdfs/ismael_as.pdf",
  "pdfs/ignacio_as.pdf",
  "pdfs/manuel_as.pdf",
  "pdfs/plitvice.pdf"
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.map(key => key !== CACHE_NAME ? caches.delete(key) : null))));
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
      return response;
    }).catch(() => caches.match('index.html')))
  );
});
