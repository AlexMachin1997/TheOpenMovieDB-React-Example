import { defineConfig, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';
import path from 'path';

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

	return defineConfig({
		plugins: [
			react(),
			tailwindcss(),
			dts({
				include: ['src/**/*'],
				exclude: ['src/**/*.stories.tsx', 'src/**/*.test.tsx', 'src/**/*.mdx']
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
				external: [
					'react',
					'react-dom',
					'react/jsx-runtime',
					// Treat all @repo/* packages as external
					/^@repo\/.*/,
					...externals
				],
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
