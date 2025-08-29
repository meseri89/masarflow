// Service Worker لتحسين الأداء والتخزين المؤقت
const CACHE_NAME = 'masarflow-v1';
const urlsToCache = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js',
  '/images/masarflowloogo.png',
  '/images/smart_automation.png',
  '/images/ai_solutions.png',
  '/images/uiux_design.png',
  '/images/Pictureofourworkers.png'
];

// تثبيت Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// تفعيل Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// التعامل مع طلبات الشبكة
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // إرجاع النسخة المخزنة إذا وجدت
        if (response) {
          return response;
        }

        // إذا لم توجد نسخة مخزنة، جلب من الشبكة
        return fetch(event.request).then(
          (response) => {
            // التحقق من صحة الاستجابة
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // نسخ الاستجابة لتخزينها
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

