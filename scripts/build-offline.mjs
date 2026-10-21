import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const output = path.resolve('dist');
async function list(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory()
    ? list(path.join(directory, entry.name)) : path.join(directory, entry.name)))).flat();
}
const files = (await list(output)).filter(file => !file.endsWith('.map') && path.basename(file) !== 'sw.js');
const hash = createHash('sha256');
for (const file of files.sort()) hash.update(await readFile(file));
const version = hash.digest('hex').slice(0, 16);
const urls = files.map(file => '/' + path.relative(output, file).split(path.sep).map(encodeURIComponent).join('/'));
const routes = ['/', '/workout', '/history', '/exercises'];
const precache = [...new Set([...urls, ...routes])];

await writeFile(path.join(output, 'sw.js'), `
const CACHE = 'workout-offline-${version}';
const PRECACHE = ${JSON.stringify(precache)};
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // Small batches also work on mobile connections. Failed installs never become active.
    for (let i = 0; i < PRECACHE.length; i += 8) {
      await Promise.all(PRECACHE.slice(i, i + 8).map(async url => {
        const response = await fetch(new Request(url, { cache: 'reload', credentials: 'same-origin' }));
        if (!response.ok || response.redirected) throw new Error('Offline download failed: ' + url);
        await cache.put(url, response);
      }));
    }
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) {
      if (key.startsWith('workout-offline-') && key !== CACHE) await caches.delete(key);
    }
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  // Authentication and unrelated endpoints must never be intercepted or cached.
  const pathname = url.pathname;
  const navigation = request.mode === 'navigate' && ${JSON.stringify(routes)}.includes(pathname.replace(/\\/$/, '') || '/');
  if (!navigation && !PRECACHE.includes(pathname)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(pathname);
    return cached || fetch(request);
  })());
});
`);
console.log(`Offline build: ${precache.length} URLs, cache ${version}`);
