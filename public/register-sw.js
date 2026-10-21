// This file is intentionally absent from development HTML: no stale Metro cache.
(() => {
  if (!('serviceWorker' in navigator)) return;
  const setStatus = status => {
    window.__workoutOfflineStatus = status;
    window.dispatchEvent(new Event('workout-offline-status'));
  };
  setStatus('loading');
  navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' }).then(registration => {
    if (registration.active) setStatus('ready');
    const watch = worker => {
      if (!worker) return;
      worker.addEventListener('statechange', () => {
        if (worker.state === 'activated' || worker.state === 'installed') setStatus('ready');
        if (worker.state === 'redundant' && !registration.active) setStatus('error');
      });
    };
    watch(registration.installing);
    registration.addEventListener('updatefound', () => watch(registration.installing));
    return navigator.serviceWorker.ready;
  }).then(() => setStatus('ready')).catch(() => setStatus('error'));
})();
