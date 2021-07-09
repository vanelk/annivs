var swRegistration;
var subscription;
const appServerPublicKey = "BMb3p8KdGsCvKoeoT395nQbXst4_8sMGOV14SG6asjgjQih7AAWATF6gsYrEoG1oSqQqJYU7izT9brwPhwnT2W8";
const isServiveWorkerSupported = () => ("serviceWorker" in navigator);
const getRegistration = () => navigator.serviceWorker.ready;
export const isPushNotificationSupported = () => ("PushManager" in window);


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

function updateSubscriptionOnServer(subscription) {
    return fetch("/push/subscribe", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });
}
export async function getSubscription() {
    if (isPushNotificationSupported()) {
        if (subscription) return subscription;
        if (!swRegistration) swRegistration = await getRegistration();
        return swRegistration.pushManager.getSubscription();
    }
}
export async function enablePush() {
    subscription = await getSubscription();
    if (!subscription) {
        try {
            subscription = await swRegistration?.pushManager?.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(appServerPublicKey)
            })
            await updateSubscriptionOnServer(subscription);
            return [true];
        } catch (e) { return [false, e.message] }
    } else {
        return [true];
    }
}
export async function disablePush() {
    subscription = await getSubscription();
    if (subscription) {
        try {
            await subscription.unsubscribe();
            return [true];
        } catch (e) { return [false, e.message] }
    }
    return [false];

}
export async function register() {
    if (isServiveWorkerSupported()) {
        swRegistration = await navigator.serviceWorker.register(process.env.PUBLIC_URL + "/sw.js", {
            scope: "/"
        });
        await enablePush();
    }
}