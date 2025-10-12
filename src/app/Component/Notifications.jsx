"use client";
import { useEffect, useState } from "react";
import { requestPermissionAndGetToken, onMessageListener } from "../firebase/firebaseMessaging";
import { toast } from "react-hot-toast";

export default function Notifications() {
  const [user, setUser] = useState(null);

  // Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        const adminUser = data.find((u) => u.role === "admin");
        setUser(adminUser);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!user?.email) return;

    const setupNotifications = async () => {
      try {
        const token = await requestPermissionAndGetToken();
        if (!token) return;

        await fetch("/api/save-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email, fcmToken: token }),
        });

        onMessageListener(async (payload) => {
          const title = payload?.notification?.title || "Notification";
          const body = payload?.notification?.body || "";
          toast(`${title}: ${body}`, { duration: 5000, position: "top-right" });

          try {
            await fetch("/api/notifications", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ userEmail: user.email, title, body, read: false }),
            });
          } catch (err) {
            console.error("Error saving notification:", err);
          }
        });
      } catch (err) {
        console.error("FCM setup error:", err);
      }
    };

    setupNotifications();
  }, [user]);

  return null;
}
