/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],

	resolve: {
		alias: {
			'~': path.resolve(__dirname, './src'),
			'~/components/*': path.resolve(__dirname, './src/components'),
			'~/hooks/*': path.resolve(__dirname, './src/hooks'),
			'~/services/*': path.resolve(__dirname, './src/services'),
			'~/types/*': path.resolve(__dirname, './src/types'),
			'~/utils/*': path.resolve(__dirname, './src/utils'),
			'~/assets/*': path.resolve(__dirname, './src/assets'),
			'~/test/*': path.resolve(__dirname, './src/test')
		},
		extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.css']
	},

	css: {
		preprocessorOptions: {
			scss: {
				// Suppress deprecation warnings for dependencies that haven't been updated yet
				// - Font Awesome 6.7.2 still uses deprecated global built-in functions like unquote()
				// - Font Awesome 6.7.2 still uses deprecated @import rules instead of @use
				// - This is functionality we don't control and can't fix
				// - Remove this when Font Awesome updates their SCSS files
				silenceDeprecations: ['global-builtin', 'import']
			}
		}
	},

	server: {
		// Don't open the browser automatically
		open: false,
		port: 3001,
		proxy: {
			'/api': {
				target: 'http://localhost:3000',
				changeOrigin: true,
				secure: false
			}
		}
	},

	build: {
		outDir: 'build',
		target: 'ES2022',
		// Enable chunk size warnings
		chunkSizeWarningLimit: 1000,
		rollupOptions: {
			output: {
				manualChunks: {
					'react-vendor': ['react', 'react-dom']
				}
			}
		}
	},

	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './src/test/setup.ts',
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
			exclude: ['node_modules/', 'src/test/setup.ts']
		},
		include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],
		testTimeout: 10000,
		hookTimeout: 10000,
		pool: 'vmThreads',
		watch: false,
		poolOptions: {
			vmThreads: {
				memoryLimit: '512mb'
			}
		}
	}
});
