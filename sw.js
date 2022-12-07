const CACHE_NAME = "PWA";
const OFFLINE_URL = "/fallback";
const CACHE_FILES = ["/", "./index.html", "./css/style.css", "./js/main.js", "./pages/fallback.js", "./pages/localização.js", "./pages/produtos.js"];

self.addEventListener("install", (event) => {
    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            await cache.add(new Request(OFFLINE_URL, { cache: "reload" }));
        })()
    );
});

self.addEventListener("activate", (event) => {
    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    if (event.request.mode === "navigate") {
        if (event.request.url.match(/SignOut/)) {
            return false;
        }
        event.respondWith(
            (async () => {
                try {
                    const networkResponse = await fetch(event.request);
                    return networkResponse;
                } catch (error) {
                    console.log("Fetch failed; returning offline page instead.", error);

                    const cache = await caches.open(CACHE_NAME);
                    const cachedResponse = await cache.match(OFFLINE_URL);
                    return cachedResponse;
                }
            })()
        );
    }
});