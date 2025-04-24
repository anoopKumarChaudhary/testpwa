import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBcKp95EpR4SWVX2FDF0HqpbrtH7S83tLg",
  authDomain: "pwareact-7703b.firebaseapp.com",
  projectId: "pwareact-7703b",
  storageBucket: "pwareact-7703b.firebasestorage.app",
  messagingSenderId: "904731326877",
  appId: "1:904731326877:web:b91dc3ec816f41a2819774",
  measurementId: "G-6RGP6JFP35",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestForToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notification permission granted.");
      const token = await getToken(messaging, {
        vapidKey:
          "BPNZRR7Hk7nbnSiFJg6dmCrBKIBQOS4aoNqLT80PD-t6DVPRXOera9flbUbifwOMYa1snn1DsFBwXbs5r97eBlY",
      });
      console.log("FCM Token:", token);
      return token;
    } else {
      console.log("Notification permission denied.");
      return null;
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
    return null;
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("Foreground message received:", payload);
      // Display notification for foreground messages
      const notificationTitle = payload.notification?.title || "New Message";
      const notificationOptions = {
        body: payload.notification?.body || "You have a new message!",
        icon: "/logo192.png",
        data: payload.data,
      };
      // Show notification in the browser
      if (Notification.permission === "granted") {
        new Notification(notificationTitle, notificationOptions);
      }
      resolve(payload);
    });
  });
