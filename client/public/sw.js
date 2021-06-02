self.addEventListener('push', function(event) {
    let data = event.data.json();
    const {title, body, picture, target} = data;
    const options = {
        body,
        icon: picture,
        tag: 'bd-notification',
        actions: [
            {
                action: "/app/p/"+target,
                title: 'open'
            }
        ]
    //   badge: 'images/badge.png'
    };
     event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", function(event){
    let url = event.action;
    event.notification.close();
    if(url.length < 1) return;
    event.waitUntil(self.clients.matchAll().then(clients => {
        if (clients.length){ // check if at least one tab is already open
          clients[0].focus();
        } else {
          self.clients.openWindow(url);
        }
    }));
})