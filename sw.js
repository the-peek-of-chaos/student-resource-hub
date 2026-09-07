/* ============================================================
   sw.js — Service Worker for PWA support
   - Caches app shell for offline access
   - Network-first for HTML, cache-first for assets
   ============================================================ */

const CACHE_NAME = "studenthub-v1";
const APP_SHELL = [
  "./",
  "./index.html",
  "./cheat-sheets.html",
  "./tools.html",
  "./contact.html",
  "./manifest.json",
  "./assets/css/styles.css",
  "./assets/js/sanitize.js",
  "./assets/js/language.js",
  "./assets/js/main.js",
  "./assets/js/config.js",
  "./assets/js/interactions.js",
  "./assets/js/ads.js",
  "./assets/js/cheat-sheets.js",
  "./assets/js/tools.js",
  "./assets/js/contact.js",
  "./assets/images/icon-192.png",
  "./assets/images/icon-512.png"
];

// Install: pre-cache app shell
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(APP_SHELL);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

// Activate: clean up old caches
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (key) {
          return key !== CACHE_NAME;
        }).map(function (key) {
          return caches.delete(key);
        })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

// Fetch: network-first for navigation & HTML, cache-first for assets
self.addEventListener("fetch", function (event) {
  const request = event.request;

  // Only handle GET
  if (request.method !== "GET") return;

  // For page navigations: try network, fall back to cache, then index
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).then(function (response) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(request, copy);
        });
        return response;
      }).catch(function () {
        return caches.match(request).then(function (cached) {
          return cached || caches.match("./index.html");
        });
      })
    );
    return;
  }

  // For assets: cache-first with network fallback + background update
  event.respondWith(
    caches.match(request).then(function (cached) {
      const networkFetch = fetch(request).then(function (response) {
        if (response && response.status === 200 && response.type === "basic") {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(request, copy);
          });
        }
        return response;
      }).catch(function () {
        return cached;
      });
      return cached || networkFetch;
    })
  );
});
