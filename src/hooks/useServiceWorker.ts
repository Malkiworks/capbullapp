import { useState, useEffect } from 'react';

export function useServiceWorker() {
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [pushSupported, setPushSupported] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Register service worker
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && 'PushManager' in window) {
      setPushSupported(true);
      
      navigator.serviceWorker.register('/sw.js')
        .then(reg => {
          setRegistration(reg);
          
          // Check current subscription status
          return reg.pushManager.getSubscription();
        })
        .then(sub => {
          if (sub) {
            setIsSubscribed(true);
            setSubscription(sub);
          }
        })
        .catch(err => {
          console.error('Service worker registration failed:', err);
          setError(err);
        });
    }
  }, []);

  // Subscribe to push notifications
  const subscribeToPush = async () => {
    try {
      if (!registration) {
        throw new Error('Service worker not registered');
      }

      // Request permission for notifications
      const permission = await Notification.requestPermission();
      
      if (permission !== 'granted') {
        throw new Error('Notification permission not granted');
      }
      
      // Get VAPID public key from environment
      const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      
      if (!vapidPublicKey) {
        throw new Error('VAPID public key not available');
      }
      
      // Convert the VAPID public key to Uint8Array
      const applicationServerKey = urlBase64ToUint8Array(vapidPublicKey);
      
      // Subscribe the user to push notifications
      const newSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey,
      });
      
      // Save subscription to state
      setSubscription(newSubscription);
      setIsSubscribed(true);
      
      // Send subscription to server
      const response = await fetch('/api/push-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subscription: newSubscription }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save subscription on server');
      }
      
      return newSubscription;
    } catch (err: any) {
      setError(err);
      throw err;
    }
  };

  // Unsubscribe from push notifications
  const unsubscribeFromPush = async () => {
    try {
      if (!subscription) {
        throw new Error('No active subscription');
      }
      
      // Unsubscribe from push manager
      const success = await subscription.unsubscribe();
      
      if (success) {
        // Remove subscription from server
        const response = await fetch(`/api/push-subscription?endpoint=${encodeURIComponent(subscription.endpoint)}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          console.warn('Failed to remove subscription from server, but unsubscribed locally');
        }
        
        setSubscription(null);
        setIsSubscribed(false);
      }
      
      return success;
    } catch (err: any) {
      setError(err);
      throw err;
    }
  };

  return {
    registration,
    isSubscribed,
    subscription,
    pushSupported,
    error,
    subscribeToPush,
    unsubscribeFromPush
  };
}

// Helper function to convert base64 to Uint8Array for VAPID key
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
} 