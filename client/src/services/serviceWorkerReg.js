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
const isServiveWorkerSupported = () => "serviceWorker" in navigator

const isPushNotificationSupported = () =>  isServiveWorkerSupported()  && "PushManager" in window;

const getSubscription = () => swRegistration?.pushManager?.getSubscription()

async function subscribeUser() {
    const appServerPublicKey = "BMb3p8KdGsCvKoeoT395nQbXst4_8sMGOV14SG6asjgjQih7AAWATF6gsYrEoG1oSqQqJYU7izT9brwPhwnT2W8";
    return swRegistration?.pushManager?.subscribe({
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
export async function enablePushNotifications() {
    if (isPushNotificationSupported()) {
        subscription = await getSubscription();
        if (subscription === null || subscription === undefined) {
            try {
                subscription = await subscribeUser();
                updateSubscriptionOnServer(subscription);
            } catch (err) { }
        }
    } else {
        console.warn('Push messaging is not supported');
    }
}
export async function registerServiceWorker() {
    if(isServiveWorkerSupported()){
        swRegistration = await navigator.serviceWorker.register(process.env.PUBLIC_URL + "/sw.js", {
            scope: "/"
        });
        await enablePushNotifications();
    }
}