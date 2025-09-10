'use client';

import { useState, useEffect } from 'react';
import { getFCMToken } from '@/lib/firebase';

export default function NotificationPermissionModal() {
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if ('Notification' in window) {
      if (Notification.permission === 'default') {
        setShowModal(true);
      }
    }
  }, []);

  const requestNotificationPermission = async () => {
    console.log('requestNotificationPermission called');
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      setStatus('Push notifications not supported');
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      console.log('Notification permission:', permission);
      if (permission !== 'granted') {
        setStatus('Permission denied');
        setShowModal(false);
        return;
      }

      const token = await getFCMToken();
      console.log('FCM token:', token);
      if (!token) {
        setStatus('Failed to get token');
        setShowModal(false);
        return;
      }

      const res = await fetch('/api/register-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      console.log('Register token response:', res);

      if (res.ok) {
        setStatus('Subscribed successfully!');
        setShowModal(false);
      } else {
        setStatus('Failed to register token');
        setShowModal(false);
      }
    } catch (error) {
      console.error(error);
      setStatus('Error subscribing');
      setShowModal(false);
    }
  };

  const handleAllow = async () => {
    console.log('handleAllow called');
    await requestNotificationPermission();
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  if (!showModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Enable Notifications</h2>
        <p className="mb-6">Stay up to date with the latest articles and news. Allow notifications to get real-time updates.</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleCancel}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            onClick={requestNotificationPermission}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Enable Notifications
          </button>
        </div>
        {status && <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">{status}</p>}
      </div>
    </div>
  );
}
