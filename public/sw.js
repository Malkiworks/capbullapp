// Service Worker for CapitalBulls
const CACHE_NAME = 'capitalbulls-cache-v1';

// Install event: cache important assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/icons/icon-192x192.png',
        '/icons/icon-512x512.png',
      ]);
    })
  );
});

// Activate event: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});

// Push notification event
self.addEventListener('push', (event) => {
  if (!event.data) {
    console.log('Push event but no data');
    return;
  }
  
  try {
    const data = event.data.json();
    
    // Check for notification data
    const notification = data.notification || {
      title: 'CapitalBulls Update',
      body: 'Something new is available in your account',
      icon: '/icons/icon-192x192.png',
      badge: '/icons/badge.png',
    };
    
    // Show the notification
    event.waitUntil(
      self.registration.showNotification(notification.title, {
        body: notification.body,
        icon: notification.icon,
        badge: notification.badge,
        image: notification.image,
        tag: notification.tag || 'default',
        data: notification.data || {},
        actions: notification.actions || [],
      })
    );
  } catch (error) {
    console.error('Error handling push event:', error);
  }
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  // Handle notification click based on tag or action
  const urlToOpen = new URL(
    event.notification.data.url || '/',
    self.location.origin
  ).href;
  
  // Focus on the tab if already open, or open a new one
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((windowClients) => {
      // Check if there is already a window/tab open with the target URL
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      
      // If no window/tab is already open, open a new one
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
}); 