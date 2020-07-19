/*

ServiceWorker for the web application

Functionality:
- Auto Updates everytime a change is detected

-Precaches all static assets


Resources:
- Handling ServiceWorker updates : https://whatwebcando.today/articles/handling-service-worker-updates/

- Handling message events: https://stackoverflow.com/questions/49566059/service-worker-registration-error-unsupported-mime-type-text-html

- PWA documentation : https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API

- Custom ServiceWorker with CRA : https://medium.com/@chinmaya.cp/custom-service-worker-in-cra-create-react-app-3b401d24b875
*/

import updateServiceWorker from './updateServiceWorker';
import activateNewServiceWorker from './activateNewServiceWorker';

// ServiceWorker registration
export const registerServiceWorker = () => {
	// Check to see if the serviceWorker exists in the clients browser and that
	if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
		// For the ServiceWorker to work the DOM needs to have loaded
		window.addEventListener('load', async () => {
			console.log('Loaded.....');

			// Wait while the WorkBox ServiceWorker registers
			const registration = await navigator.serviceWorker.register(
				`${process.env.PUBLIC_URL}/sw.js`,

				{ scope: '/' },
			);

			// Ensure the case when the updatefound event was missed is also handled by re-invoking the prompt when there's a waiting Service Worker
			if (registration.waiting) {
				console.log('[ServiceWorker] Waiting...');

				updateServiceWorker(registration);
			}

			// ServiceWorker update trigger
			registration.addEventListener('updatefound', () => {
				console.log('[ServiceWorker] Update Found.....');

				// Wait until the new Service worker is actually installed (ready to take over)
				if (registration.installing) {
					console.log('[ServiceWorker] Installing....');

					// ServiceWorker statechange event
					registration.installing.addEventListener('statechange', () => {
						console.log('[ServiceWorker] The state has changed.... ');

						// ServiceWorker is waiting (In skipWaiting state..)
						if (registration.waiting) {
							console.log('[ServiceWorker] Waiting.....');

							// If there's an existing controller (previous Service Worker), show the prompt
							if (navigator.serviceWorker.controller) {
								updateServiceWorker(registration);
							} else {
								console.log('Service Worker initialized for the first time');
							}
						}
					});
				}
			});

			// Refresh the current browser tab
			activateNewServiceWorker();
		});
	}
};
