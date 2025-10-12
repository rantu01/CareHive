import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_apiKey,
  authDomain: process.env.NEXT_PUBLIC_authDomain,
  projectId: process.env.NEXT_PUBLIC_projectId,
  storageBucket: process.env.NEXT_PUBLIC_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let messaging = null;
if (typeof window !== "undefined") {
  messaging = getMessaging(app);
}

// Convert VAPID public key to Uint8Array safely
export function urlBase64ToUint8Array(base64String) {
  if (!base64String) return null;
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return new Uint8Array([...rawData].map(c => c.charCodeAt(0)));
}

// Request permission and get FCM token
export const requestPermissionAndGetToken = async () => {
  if (!messaging) return null;

  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") return null;

    const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");

    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
      serviceWorkerRegistration: registration,
    });

    console.log("FCM Token:", token);
    return token;
  } catch (err) {
    console.error("FCM error:", err);
    return null;
  }
};

// ✅ Continuous foreground message listener
export const onMessageListener = (callback) => {
  if (!messaging) return;
  onMessage(messaging, callback);
};
