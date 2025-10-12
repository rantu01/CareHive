"use client";
import { useEffect, useState } from "react";
import { requestPermissionAndGetToken, onMessageListener } from "../firebase/firebaseMessaging";

export default function useNotifications({ onNewNotification } = {}) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    let isSubscribed = true;
    let unsubscribe = null;

    const setupFCM = async () => {
      // 1️⃣ Request permission & get FCM token
      const token = await requestPermissionAndGetToken();
      if (token) console.log("FCM token:", token);

      // 2️⃣ Listen for foreground notifications
      unsubscribe = onMessageListener((payload) => {
        if (!isSubscribed) return;
        if (payload?.notification) {
          const notif = payload.notification;
          setNotifications((prev) => [notif, ...prev]);
          if (onNewNotification) onNewNotification(notif);
          console.log("Foreground notification received:", notif);
        }
      });
    };

    setupFCM();

    return () => {
      isSubscribed = false;
      if (unsubscribe) unsubscribe();
    };
  }, [onNewNotification]);

  return notifications;
}
