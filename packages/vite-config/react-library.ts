import { defineConfig, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';
import path from 'node:path';
import { createExternalMatcher, DTS_EXCLUDE } from './shared.js';

interface ReactLibraryOptions {
	/** Path to the library entry file (default: 'src/index.ts') */
	entry?: string;
	/** Library name for UMD builds */
	name?: string;
	/** Package names to externalize on top of the package's declared dependencies */
	externals?: string[];
	/** Declared dependencies to bundle into `dist/` anyway */
	bundle?: string[];
}

/**
 * Shared Vite configuration for React UI library packages.
 *
 * Includes:
 * - React SWC plugin
 * - Tailwind CSS v4 plugin
 * - DTS generation (excludes stories and tests)
 * - Tree-shakeable output via preserveModules
 * - CSS code splitting per component
 * - Path alias: `~` -> `./src`
 * - Externalization of React, `@repo/*` and the package's own declared dependencies
 */
export const reactLibrary = (options: ReactLibraryOptions = {}): UserConfig => {
	const { entry = 'src/index.ts', externals = [], bundle = [] } = options;

	return defineConfig({
		plugins: [
			react(),
			tailwindcss(),
			dts({
				include: ['src/**/*'],
				exclude: DTS_EXCLUDE
			})
		],

		resolve: {
			alias: {
				'~': path.resolve(process.cwd(), './src')
			},
			extensions: ['.js', '.jsx', '.ts', '.tsx', '.css']
		},

		build: {
			lib: {
				entry,
				formats: ['es']
			},
			outDir: 'dist',
			target: 'ES2022',
			rollupOptions: {
				external: createExternalMatcher({ externals, bundle }),
				output: {
					preserveModules: true,
					preserveModulesRoot: 'src',
					entryFileNames: '[name].js'
				}
			},
			cssCodeSplit: true
		}
	});
};
