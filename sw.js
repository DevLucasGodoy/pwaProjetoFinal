let cacheName = "pwa";
let offline_url = "/pages/localização";
let filesToCache = ["/", "./index.html", "./css/style.css", "./js/main.js", "./pages/fallback.js", "./pages/localização.js", "./pages/produtos.js"];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache);
    })
  );
});

// /* disponibilizando o conteudo quando estiver offline */
// self.addEventListener("fetch", (e) => {
//   e.respondWith(
//     caches.match(e.request).then((response) => {
//       return response || fetch(e.request);
//     })
//   );
// });

self.addEventListener("fetch", (event) => {
  // We only want to call event.respondWith() if this is a navigation request
  // for an HTML page.
  if (event.request.mode === "navigate") {
      if (event.request.url.match()) {
          return false;
      }
      event.respondWith(
          (async () => {
              try {
                  let networkResponse = await fetch(event.request);
                  return networkResponse;
              } catch (error) {
                  console.log("Fetch failed; returning offline page instead.", error);

                  let cache = await caches.open(cacheName);
                  let cachedResponse = await cache.match(offline_url);
                  return cachedResponse;
              }
          })()
      );
  }
});

