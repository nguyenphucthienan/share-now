const CACHE_STATIC_NAME = 'static-v1';

const STATIC_FILES = [
  '/',
  '/index.html',
  '/resources/js/materialize-scripts.js',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.1/js/materialize.min.js'
];

self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(caches.open(CACHE_STATIC_NAME)
    .then(cache => cache.addAll(STATIC_FILES)));
});

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating Service Worker ...', event);
  event.waitUntil(caches.keys()
    .then(keyList => Promise.all([keyList.map((key) => {
      if (key !== CACHE_STATIC_NAME) {
        console.log('[Service Worker] Removing old cache', key);
        return caches.delete(key);
      }
    })])));

  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (isInArray(event.request.url, STATIC_FILES)) {
    event.respondWith(caches.match(event.request));
  } else {
    event.respondWith(fetch(event.request)
      .catch(err => caches.match(event.request)));
  }
});

self.addEventListener('notificationclick', (event) => {
  const { notification, action } = event;
  console.log(notification);

  if (action === 'confirm') {
    console.log('Confirm was chosen');
    notification.close();
  } else {
    console.log(action);
    event.waitUntil(clients.matchAll()
      .then((clis) => {
        const client = clis.find(c => c.visibilityState === 'visible');

        if (client) {
          client.navigate(notification.data.url);
          client.focus();
        } else {
          clients.openWindow(notification.data.url);
        }

        notification.close();
      }));
  }
});

self.addEventListener('push', (event) => {
  console.log('Push Notification received', event);

  let data = {
    title: 'Notification',
    content: 'Something new happened!',
    openUrl: '/'
  };

  if (event.data) {
    data = JSON.parse(event.data.text());
  }

  const options = {
    body: data.content,
    icon: '/resources/icons/144x144.png',
    badge: '/resources/icons/144x144.png',
    data: {
      url: data.openUrl,
    }
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

function isInArray(string, array) {
  let cachePath;
  // request targets domain where we serve the page from (i.e. NOT a CDN)
  if (string.indexOf(self.origin) === 0) {
    // take the part of the URL AFTER the domain (e.g. after localhost:8080)
    cachePath = string.substring(self.origin.length);
  } else {
    // store the full request (for CDNs)
    cachePath = string;
  }

  return array.indexOf(cachePath) > -1;
}
