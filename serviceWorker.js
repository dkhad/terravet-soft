const staticTerraVetSoftCacheKey = 'static-terravet-soft-v5';
const basePath = '/terravet-soft';

// https://stackoverflow.com/questions/41009167/what-is-the-use-of-self-clients-claim
// self.clients.claim() makes the service worker take control of the page when you first register a service worker.
// If there is already a service worker on the page, it will make no difference.
// self.skipWaiting() makes a new service worker replace an old one.
// Without it, you would have to close the page (and any other open tabs containing a page in the same scope) before the new service worker was activated.

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
    // self.skipWaiting() would be used to immediately apply an update to an existing serviceWorker
    // self.skipWaiting(); // change an old service worker to the new one

    installEvent.waitUntil(
        caches
            .open(staticTerraVetSoftCacheKey)
            .then(cache => cache.addAll(assets))
    );
});

self.addEventListener('activate', activateEvent => {
    // clients.claim() would be used for taking control immediately on the first load.
    // self.clients.claim();

    // Delete old caches, keep staticTerraVetSoftCacheKey only
    console.log('service worker activated');
    activateEvent.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(keyList.map(key => {
                console.log(key);
                if (staticTerraVetSoftCacheKey.indexOf(key) < 0) {
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
