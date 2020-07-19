const { injectManifest } = require('workbox-build');

// Generates the Workbox manifest (Don't get confused with the PWA manifest)
const generateServiceWorkerManifest = async () => {
	try {
		const caching = injectManifest({
			// Custom WorkBox ServiceWorker
			swSrc: 'src/serviceWorker/workboxServiceWorker.js',

			// Output location (CRA defaults to /build )
			swDest: 'build/sw.js',

			// Output folder
			globDirectory: 'build',

			// What files to look for when precaching
			globPatterns: ['**/*.{js,css,html,png,svg}'],

			// Maximum file size
			// Allows up to 30 mb, this is typically what Airbnb and Instagram allows
			maximumFileSizeToCacheInBytes: 30000000,
		});

		// Once the manifest has been injected show what the precaching size is (Roughly)
		caching.then(({ count, size, warnings }) => {
			warnings.forEach(console.warn);
			console.info(`${count} files will be precached, totaling ${size / (1024 * 1024)} MBs.`);
		});
	} catch (err) {
		console.log('[ServiceWorker] Precaching failed.....');
		console.log(err);
	}
};

generateServiceWorkerManifest();
