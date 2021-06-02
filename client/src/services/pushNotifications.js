// from https://web-push-codelab.glitch.me/

var swRegistration;
var subscription;
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
function isPushNotificationSupported() {
    return "serviceWorker" in navigator && "PushManager" in window;
}
function registerServiceWorker() {
    return navigator.serviceWorker.register(process.env.PUBLIC_URL + "/sw.js", {
        scope: "/app"
    });
}
function getSubscription() {
    return swRegistration.pushManager.getSubscription()
}
async function subscribeUser() {
    const appServerPublicKey = "BMb3p8KdGsCvKoeoT395nQbXst4_8sMGOV14SG6asjgjQih7AAWATF6gsYrEoG1oSqQqJYU7izT9brwPhwnT2W8";
    return swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(appServerPublicKey)
    })
}
function updateSubscriptionOnServer(subscription) {
    return fetch("/push/subscribe", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });
}
export async function initializePush() {
    // check if service worker and push supported
    if (isPushNotificationSupported()) {
        try {
            swRegistration = await registerServiceWorker();
            console.log('Service Worker is registered!');
        } catch (e) {
            console.error('Service Worker Error', e);
        }

        subscription = await getSubscription();
        if (subscription === null) {
            try {
                subscription = await subscribeUser();
                updateSubscriptionOnServer(subscription);
            } catch (err) {
                // Notification.permission === 'denied'
                console.error(err);
            }
        }

    } else {
        console.warn('Push messaging is not supported');
    }
}
