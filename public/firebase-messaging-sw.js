// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDYozU6SdZmypDCIZ9QhwBRP626IL15fM8",
  authDomain: "carehive-86ab3.firebaseapp.com",
  projectId: "carehive-86ab3",
  storageBucket: "carehive-86ab3.firebasestorage.app",
  messagingSenderId: "226425455907",
  appId: "1:226425455907:web:1cef103bebb3b1038e7896",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Background message received:", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo.png",
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
