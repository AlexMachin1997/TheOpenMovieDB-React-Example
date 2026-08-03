import { defineConfig, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';
import path from 'node:path';
import { DTS_EXCLUDE } from './shared.js';

interface ReactLibraryOptions {
	/** Path to the library entry file (default: 'src/index.ts') */
	entry?: string;
	/** Library name for UMD builds */
	name?: string;
	/** Additional external dependencies to exclude from the bundle */
	externals?: string[];
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
 */
export const reactLibrary = (options: ReactLibraryOptions = {}): UserConfig => {
	const { entry = 'src/index.ts', externals = [] } = options;

	// React must never be bundled into a library's own dist output — every package here shares
	// a single React instance with whatever app (or sibling package) imports it. Bundling a
	// private copy breaks hooks/context across package boundaries with "Cannot read properties
	// of null (reading 'useState')" the moment two bundled copies render in the same tree.
	const REACT_EXTERNALS = ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'];

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
				external: (id) => {
					if (id.startsWith('@repo/')) return true;
					if (REACT_EXTERNALS.some((ext) => id === ext || id.startsWith(`${ext}/`))) return true;
					if (externals.some((ext) => id === ext || id.startsWith(`${ext}/`))) return true;
					return false;
				},
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
