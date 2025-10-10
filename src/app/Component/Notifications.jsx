import { useEffect } from "react";
import { requestPermissionAndGetToken, onMessageListener } from "../firebase/firebaseMessaging";

export default function Notifications() {
  useEffect(() => {
    requestPermissionAndGetToken();

    const unsubscribe = onMessageListener().then(payload => {
      alert(`${payload.notification.title}: ${payload.notification.body}`);
    });

    return () => unsubscribe;
  }, []);

  return null;
}
