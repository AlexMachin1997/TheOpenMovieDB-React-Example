/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		dts({
			include: ['src/**/*'],
			exclude: ['src/**/*.stories.tsx', 'src/**/*.test.tsx']
		})
	],

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
				silenceDeprecations: ['global-builtin', 'import']
			}
		}
	},

	build: {
		lib: {
			entry: 'src/index.ts',
			name: 'CommonUI',
			formats: ['es'],
			fileName: 'index'
		},
		outDir: 'dist',
		target: 'ES2022',
		chunkSizeWarningLimit: 1000,
		rollupOptions: {
			external: ['react', 'react-dom'],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM'
				}
			}
		},
		cssCodeSplit: false
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
