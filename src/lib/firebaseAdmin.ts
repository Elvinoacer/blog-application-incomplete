// src/lib/firebaseAdmin.ts
import admin from "firebase-admin";

if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK_JSON as string);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const messaging = admin.messaging();
