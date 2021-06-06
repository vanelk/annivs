const CACHE_NAME = 'hbd-static-cache';

const buildURLArray = self.__WB_MANIFEST || [
    {url:"index.html"},
    {url:"favicon.ico"},
    {url:"icon-192x192.png"},
    {url:"icon-512x512.png"},
    {url:"static/js/bundle.js"},
    {url:"static/js/main.chunk.js"},
    {url:"static/js/vendors~main.chunk.js"},
    {url:"static/media/gilroy-extrabold.3d06cf26.woff"},
    {url:"static/media/fontello.adbf3f47.woff2"},
    {url:"static/media/dog.bbf235eb.png"},
    {url:"static/media/pageError.74025544.png"},
    {url:"static/media/search404.c8811a3e.png"}
];
const urlsToCache = [
    ...buildURLArray.map(({url})=>`/${url}`),
    "https://fonts.googleapis.com/css2?family=Roboto&display=swap"
];

console.log(urlsToCache);
self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            cache.addAll(urlsToCache);
        }))
})
// activate service worker
self.addEventListener('activate', function (event) {
    console.log('serice worker activated');
})
// listen and intercept all requests
self.addEventListener('fetch', function (event) {
    if(event.request.url.indexOf("/app") !== -1 || event.request.url === "/"){
        event.respondWith(caches.match(new Request("/index.html")).then(res=>{
            return res;
        }))
        return;
    }
    event.respondWith(caches.match(event.request).then(res=>{
        return res || fetch(event.request);
    }))
})

self.addEventListener('push', function (event) {
    let data = event.data.json();
    const { title, body, picture, target } = data;
    const options = {
        body,
        icon: picture,
        tag: 'hbd-notification',
        actions: [
            {
                action: "/app/p/" + target,
                title: 'Open'
            }
        ]
        //   badge: 'images/badge.png'
    };
    event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", function (event) {
    let url = event.action || "/app";
    event.notification.close();
    event.waitUntil(self.clients.matchAll().then(clients => {
        if (clients.length) { // check if at least one tab is already open
            clients[0].focus();
        } else {
            self.clients.openWindow(url);
        }
    }));
})