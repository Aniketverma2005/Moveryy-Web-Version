/**
 * Service Worker for Moveryy
 * 
 * Handles push notifications, background sync, and caching
 * for the Moveryy web application.
 */

const CACHE_NAME = 'moveryy-v1';
const API_CACHE_NAME = 'moveryy-api-v1';

// Files to cache for offline functionality
const STATIC_CACHE_FILES = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/logo.png',
  '/manifest.json'
];

// API endpoints to cache
const API_CACHE_PATTERNS = [
  /\/api\/user\/profile/,
  /\/api\/transport\/dashboard/,
  /\/api\/location\/nearby/
];

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Caching static files');
        return cache.addAll(STATIC_CACHE_FILES);
      })
      .then(() => {
        console.log('✅ Service Worker installed successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ Service Worker installation failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== API_CACHE_NAME) {
              console.log('🗑️ Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ Service Worker activated successfully');
        return self.clients.claim();
      })
  );
});

// Fetch event - handle network requests
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle API requests
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleApiRequest(request));
    return;
  }

  // Handle static file requests
  event.respondWith(handleStaticRequest(request));
});

// Handle API requests with caching strategy
async function handleApiRequest(request) {
  const url = new URL(request.url);
  const shouldCache = API_CACHE_PATTERNS.some(pattern => pattern.test(url.pathname));

  if (shouldCache && request.method === 'GET') {
    try {
      // Try network first, then cache
      const networkResponse = await fetch(request);
      
      if (networkResponse.ok) {
        const cache = await caches.open(API_CACHE_NAME);
        cache.put(request, networkResponse.clone());
      }
      
      return networkResponse;
    } catch (error) {
      // Network failed, try cache
      const cachedResponse = await caches.match(request);
      if (cachedResponse) {
        console.log('📱 Serving API response from cache:', url.pathname);
        return cachedResponse;
      }
      
      // Return offline response
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Network unavailable. Please check your connection.',
          offline: true
        }),
        {
          status: 503,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  }

  // For non-cacheable API requests, just fetch
  return fetch(request);
}

// Handle static file requests
async function handleStaticRequest(request) {
  try {
    // Try cache first, then network
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      const offlineResponse = await caches.match('/');
      if (offlineResponse) {
        return offlineResponse;
      }
    }
    
    throw error;
  }
}

// Push notification event
self.addEventListener('push', (event) => {
  console.log('📢 Push notification received');
  
  if (!event.data) {
    console.warn('⚠️ Push event has no data');
    return;
  }

  try {
    const data = event.data.json();
    const { title, body, icon, badge, tag, actions, data: notificationData } = data;

    const options = {
      body,
      icon: icon || '/logo.png',
      badge: badge || '/logo.png',
      tag: tag || 'moveryy-notification',
      requireInteraction: false,
      actions: actions || [],
      data: notificationData || {}
    };

    event.waitUntil(
      self.registration.showNotification(title, options)
        .then(() => {
          console.log('✅ Notification displayed successfully');
        })
        .catch((error) => {
          console.error('❌ Failed to display notification:', error);
        })
    );
  } catch (error) {
    console.error('❌ Failed to parse push notification data:', error);
  }
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  console.log('👆 Notification clicked');
  
  const { notification, action } = event;
  const data = notification.data || {};

  event.notification.close();

  event.waitUntil(
    handleNotificationClick(action, data)
  );
});

// Handle notification click actions
async function handleNotificationClick(action, data) {
  const clients = await self.clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  });

  // Determine URL to open based on notification data
  let urlToOpen = '/';
  
  if (data.type === 'order') {
    urlToOpen = `/transport/bookings/${data.orderId}`;
  } else if (data.type === 'booking') {
    urlToOpen = `/bookings/${data.bookingId}`;
  } else if (data.type === 'payment') {
    urlToOpen = '/payments';
  } else if (data.url) {
    urlToOpen = data.url;
  }

  // Handle specific actions
  if (action === 'accept_order' && data.orderId) {
    // Send message to client to accept order
    if (clients.length > 0) {
      clients[0].postMessage({
        type: 'ACCEPT_ORDER',
        orderId: data.orderId
      });
    }
    urlToOpen = `/transport/bookings/${data.orderId}`;
  } else if (action === 'view_details') {
    // Use the URL from notification data
    urlToOpen = data.detailsUrl || urlToOpen;
  }

  // Try to focus existing window or open new one
  const existingClient = clients.find(client => {
    const clientUrl = new URL(client.url);
    const targetUrl = new URL(urlToOpen, self.location.origin);
    return clientUrl.pathname === targetUrl.pathname;
  });

  if (existingClient) {
    await existingClient.focus();
    existingClient.postMessage({
      type: 'NOTIFICATION_CLICKED',
      action,
      data
    });
  } else {
    await self.clients.openWindow(urlToOpen);
  }
}

// Background sync event
self.addEventListener('sync', (event) => {
  console.log('🔄 Background sync triggered:', event.tag);
  
  if (event.tag === 'location-update') {
    event.waitUntil(syncLocationUpdate());
  } else if (event.tag === 'offline-actions') {
    event.waitUntil(syncOfflineActions());
  }
});

// Sync location updates when back online
async function syncLocationUpdate() {
  try {
    const locationData = await getStoredLocationData();
    if (locationData) {
      await fetch('/api/location/driver/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await getStoredToken()}`
        },
        body: JSON.stringify(locationData)
      });
      
      await clearStoredLocationData();
      console.log('✅ Location data synced successfully');
    }
  } catch (error) {
    console.error('❌ Failed to sync location data:', error);
  }
}

// Sync offline actions when back online
async function syncOfflineActions() {
  try {
    const offlineActions = await getStoredOfflineActions();
    
    for (const action of offlineActions) {
      try {
        await fetch(action.url, {
          method: action.method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${await getStoredToken()}`
          },
          body: action.body
        });
        
        console.log('✅ Offline action synced:', action.type);
      } catch (error) {
        console.error('❌ Failed to sync offline action:', action.type, error);
      }
    }
    
    await clearStoredOfflineActions();
  } catch (error) {
    console.error('❌ Failed to sync offline actions:', error);
  }
}

// Helper functions for IndexedDB operations
async function getStoredLocationData() {
  // Implementation would use IndexedDB to retrieve stored location data
  return null;
}

async function clearStoredLocationData() {
  // Implementation would clear stored location data from IndexedDB
}

async function getStoredOfflineActions() {
  // Implementation would retrieve stored offline actions from IndexedDB
  return [];
}

async function clearStoredOfflineActions() {
  // Implementation would clear stored offline actions from IndexedDB
}

async function getStoredToken() {
  // Get token from clients or storage
  const clients = await self.clients.matchAll();
  if (clients.length > 0) {
    return new Promise((resolve) => {
      const messageChannel = new MessageChannel();
      messageChannel.port1.onmessage = (event) => {
        resolve(event.data.token);
      };
      clients[0].postMessage({ type: 'GET_TOKEN' }, [messageChannel.port2]);
    });
  }
  return null;
}

// Message event - handle messages from clients
self.addEventListener('message', (event) => {
  const { type, data } = event.data;
  
  if (type === 'SKIP_WAITING') {
    self.skipWaiting();
  } else if (type === 'CACHE_URLS') {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(cache => cache.addAll(data.urls))
    );
  } else if (type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.delete(data.cacheName || CACHE_NAME)
    );
  }
});

console.log('🔧 Service Worker script loaded');