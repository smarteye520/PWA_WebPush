let CACHE_NAME = 'POSTGAME';
let urlsToCache = [ 'index.html', 'offline.html' ];

// Install a service worker
self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Cache and return requests
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        return fetch(event.request).catch(()=> caches.match('offline.html'));
      }
    )
  );
});

// Update a service worker
self.addEventListener('activate', event => {
  let cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// self.addEventListener('push', (event) => {
//   event.waitUntil(
//     self.registration.showNotification('Notification Title', {
//       body: 'Notification Body Text',
//       icon: 'custom-notification-icon.png',
//     })
//   )
// })