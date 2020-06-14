/*
Controller change resources:

- Offical Google docs : https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle

*/

const activateNewServiceWorker = () => {
	// Prevents multiple page refreshes
	let refreshing = false;

	// When the skipWaiting event is fired the contrrollerchange listener is triggered
	navigator.serviceWorker.addEventListener('controllerchange', () => {
		// When reload is false reload
		if (refreshing === false) {
			// Reload the browser
			window.location.reload();

			// Set to true to prevent multiple refreshes
			refreshing = true;
		}
	});
};

export default activateNewServiceWorker;
