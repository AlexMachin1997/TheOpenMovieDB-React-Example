/*
skipWaiting resources:

- Official Google docs : https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle

- skipWaiting: https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle#waiting
*/

const updateServiceWorker = (serviceWorker) => {
	// Logs a message for debugging purposes
	console.log('[ServiceWorker] Sending a message to the ServiceWorker to skip waiting');

	// Checks to see if the ServiceWorker is in a waiting site
	if (serviceWorker.waiting) {
		// Send a message to the WorkBox ServiceWorker that the ServiceWorker is waiting and needs to skipWaiting();
		serviceWorker.waiting.postMessage('skipWaiting');
	}
};

export default updateServiceWorker;
