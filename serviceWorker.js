const staticTerraVetSoft = 'static-terravet-soft';

const assets = [
    '/',
    '/index.html',
    '/css/bulma.min.css',
    '/js/jquery-3.6.0.min.js',
    '/js/app.js',
    '/images/icons/icon-57.png',
    '/images/icons/icon-60.png',
    '/images/icons/icon-72.png',
    '/images/icons/icon-76.png',
    '/images/icons/icon-96.png',
    '/images/icons/icon-114.png',
    '/images/icons/icon-120.png',
    '/images/icons/icon-128.png',
    '/images/icons/icon-144.png',
    '/images/icons/icon-152.png',
    '/images/icons/icon-180.png',
    '/images/icons/icon-192.png',
    '/images/icons/icon-384.png',
    '/images/icons/icon-512.png',
];

self.addEventListener('install', installEvent => {
    installEvent.waitUntil(
        caches
            .open(staticTerraVetSoft)
            .then(cache => cache.addAll(assets))
            .catch(err => console.log('service worker not registered', err))
    );
});

self.addEventListener('fetch', fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request);
        })
    );
});
