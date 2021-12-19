const staticTerraVetSoftCacheKey = 'static-terravet-soft-v4';
const basePath = '/terravet-soft';

const assets = [
    basePath,
    `${basePath}/index.html`,
    `${basePath}/css/bulma.min.css`,
    `${basePath}/js/jquery-3.6.0.min.js`,
    `${basePath}/js/app.js`,
    `${basePath}/images/icons/icon-57.png`,
    `${basePath}/images/icons/icon-60.png`,
    `${basePath}/images/icons/icon-72.png`,
    `${basePath}/images/icons/icon-76.png`,
    `${basePath}/images/icons/icon-96.png`,
    `${basePath}/images/icons/icon-114.png`,
    `${basePath}/images/icons/icon-120.png`,
    `${basePath}/images/icons/icon-128.png`,
    `${basePath}/images/icons/icon-144.png`,
    `${basePath}/images/icons/icon-152.png`,
    `${basePath}/images/icons/icon-180.png`,
    `${basePath}/images/icons/icon-192.png`,
    `${basePath}/images/icons/icon-384.png`,
    `${basePath}/images/icons/icon-512.png`,
];

self.addEventListener('install', installEvent => {
    installEvent.waitUntil(
        caches
            .open(staticTerraVetSoftCacheKey)
            .then(cache => cache.addAll(assets))
    );
});

self.addEventListener('activate', (event) => {
    // Delete old caches, keep staticTerraVetSoftCacheKey only
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (staticTerraVetSoftCacheKey.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }));
        })
    );
});

self.addEventListener('fetch', fetchEvent => {
    // Cache-First Strategy

    // default behaviour: request the network
    // fetchEvent.respondWith(fetch(event.request));

    // custom behaviour
    fetchEvent.respondWith(
        caches
            .match(fetchEvent.request) // check if the request has already been cached
            .then(cached => cached || fetch(fetchEvent.request)) // otherwise request network
    );
});
