const CACHE_NAME = 'v1';
const urlsToCache = ['index.html', 'offline.html'];
const self = this;
// install SW
self.addEventListener('install', (event)=>{
    event.waiUntil(caches.open(CACHE_NAME))
    .then(cache=>{
        console.log("cahes opened");
        return cache.addAll('index.html', 'offline.html')
    })
})

// listen for requests
self.addEventListener('fetch', (event)=>{

})

// Activate SW
self.addEventListener('activate', (event)=>{

})