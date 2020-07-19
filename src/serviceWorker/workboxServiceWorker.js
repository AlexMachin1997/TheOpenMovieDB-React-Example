/* eslint-disable no-undef */

/* eslint-disable no-restricted-globals */

/*
Workbox ServiceWorker resources:

- Workbox docs ; https://developers.google.com/web/tools/workbox

- Workbox caching stratergies : https://developers.google.com/web/tools/workbox/modules/workbox-strategies


*/

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-sw.js');

// Global workbox

if (workbox) {
	// Disable logging
	workbox.setConfig({ debug: false });

	// Log the ServiceWorker is supported for the current user
	console.log('[ServiceWorker] is supported');

	/*
  message event:
  - To activate the message event listenr use registration.waiting.postMessage([Insert Message]);
  - check event.data === the inserted message
  */
	self.addEventListener('message', (event) => {
		console.log(`[ServiceWorker] ${event.data}  Received...`);

		// When the service worker is waiting skipWaiting to activate the new service worker
		if (event.data === 'skipWaiting') {
			self.skipWaiting();
		}
	});

	// Manual injection point for manifest files.
	workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

	// Image caching
	workbox.routing.registerRoute(
		/\.(?:png|gif|jpg|jpeg|svg)$/,

		new workbox.strategies.CacheFirst({
			cacheName: 'images',

			plugins: [
				new workbox.expiration.Plugin({
					maxEntries: 60,

					maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
				}),
			],
		}),
	);

	// JS, CSS caching
	workbox.routing.registerRoute(
		/\.(?:js|css)$/,

		new workbox.strategies.CacheFirst({
			cacheName: 'static-resources',

			plugins: [
				new workbox.expiration.Plugin({
					maxEntries: 60,

					maxAgeSeconds: 20 * 24 * 60 * 60, // 20 Days
				}),
			],
		}),
	);
} else {
	console.error('[ServiceWorker] Workbox could not be loaded. No offline support');
}
