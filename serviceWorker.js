const staticTerraVetSoft = 'static-terravet-soft-v1';
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
            .open(staticTerraVetSoft)
            .then(cache => cache.addAll(assets))
    );
});

self.addEventListener('fetch', fetchEvent => {
    fetchEvent.respondWith(
        caches
            .match(fetchEvent.request)
            .then(response => response || fetch(fetchEvent.request))
    );
});
