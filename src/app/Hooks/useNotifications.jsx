import { useEffect, useState } from "react";
import { requestPermissionAndGetToken, onMessageListener } from "../firebase/firebaseMessaging";

export default function useNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Request permission & FCM token
    requestPermissionAndGetToken();

    // Listen for foreground messages
    const unsubscribe = onMessageListener().then((payload) => {
      if (payload?.notification) {
        setNotifications((prev) => [payload.notification, ...prev]);
      }
    });

    return () => {
      if (unsubscribe) unsubscribe;
    };
  }, []);

  return notifications;
}
