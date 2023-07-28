/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
	// Provide any plugins required for Vite to work and perform additional setup.
	plugins: [react(), splitVendorChunkPlugin()],

	// Development server configuration
	server: {
		// Don't open the browser automatically, sometimes the Vite server is too fast and boots up before the server and causes an OKTA error
		open: false,

		// Provide a static port number for the project to run on, originally set via the .env file but we have access to the configuration now.
		port: 3001,

		// React-scripts did this via the package.json, Vite does it via the server proxy object
		proxy: {
			// Any incoming requests which start with /api then proxy them to the provided  backend address
			'/api': 'http://localhost:3000'
		}
	},

	// Build configuration
	build: {
		// By default this is dist, were updating it to use the react-scripts build folder
		outDir: 'build'
	},

	test: {
		globals: false,
		watch: false,
		include: [
			'./src/services/DiscoverFiltersFormDataService//DiscoverFiltersFormDataService.test.ts'
		]
	}
});
