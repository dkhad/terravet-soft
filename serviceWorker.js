const staticTerraVetSoft = 'static-terravet-soft';

const assets = [
    '/',
    'index.html',
    'css/bulma.min.css',
    'css/font-awesome.min.css',
    'js/jquery-3.6.0.min.js',
    'js/app.js',
    'images/icons/icon-57.png',
    'images/icons/icon-60.png',
    'images/icons/icon-72.png',
    'images/icons/icon-76.png',
    'images/icons/icon-96.png',
    'images/icons/icon-114.png',
    'images/icons/icon-120.png',
    'images/icons/icon-128.png',
    'images/icons/icon-144.png',
    'images/icons/icon-152.png',
    'images/icons/icon-180.png',
    'images/icons/icon-192.png',
    'images/icons/icon-384.png',
    'images/icons/icon-512.png',
    'fonts/FontAwesome.otf',
    'fonts/fontawesome-webfont.eot',
    'fonts/fontawesome-webfont.svg',
    'fonts/fontawesome-webfont.ttf',
    'fonts/fontawesome-webfont.woff',
    'fonts/fontawesome-webfont.woff2',
];

self.addEventListener('install', installEvent => {
    installEvent.waitUntil(
        caches.open(staticTerraVetSoft).then(cache => {
            cache.addAll(assets);
        })
    );
});

self.addEventListener('fetch', fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request);
        })
    );
});
