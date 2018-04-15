if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/resources/js/service-worker.js')
    .then((registration) => {
      console.log('Service worker registration succeeded', registration);
    })
    .catch((err) => {
      console.log('Service worker registration failed', err);
    });
} else {
  console.log('Service workers are not supported');
}
