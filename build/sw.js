/** v1.0.0 **/
const CACHE_NAME = 'hbd-static-cache';
const urlsToCache = [
    "/",
    "/favicon.ico",
    "/icon-192x192.png",
    "/icon-512x512.png",
    "static/js/2.4185a7f5.chunk.js",
    "static/js/main.3fd90ab5.chunk.js",
    "static/js/runtime-main.a06e69b5.chunk.js",
    "/static/media/gilroy-extrabold.3d06cf26.woff",
    "/static/media/fontello.adbf3f47.woff2",
    "/static/main.b5ba033d.chunk.css",
    "https://fonts.googleapis.com/css2?family=Roboto&display=swap",
    "/static/media/dog.bbf235eb.png",
    "/static/media/pageError.74025544.png",
    "/static/media/search404.c8811a3e.png"
];

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
    if(event.request.url.indexOf("/app") !== -1){
        event.respondWith(caches.match(new Request("/")).then(res=>{
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