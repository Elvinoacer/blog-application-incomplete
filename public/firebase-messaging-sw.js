
// Import the Firebase app and messaging compat scripts
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker
const firebaseConfig = {
  apiKey: "AIzaSyCRO0syVY11KEa6VLP-YaHP0daxFNnGxVE",
  authDomain: "the-grok-ntf.firebaseapp.com",
  projectId: "the-grok-ntf",
  storageBucket: "the-grok-ntf.firebasestorage.app",
  messagingSenderId: "590787118981",
  appId: "1:590787118981:web:020c1b66f86adf998fe6ec",
  measurementId: "G-YY1YGQHKX9",
};

firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png',
    image: payload.notification.imageUrl
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
