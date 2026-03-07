import { defineConfig, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';
import path from 'node:path';
import fs from 'node:fs';

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

	let pkg: any = {};
	try {
		pkg = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf-8'));
	} catch (e) {
		console.warn(`Could not read package.json in ${process.cwd()}`);
	}

	const pkgDependencies = [
		...Object.keys(pkg.dependencies || {}),
		...Object.keys(pkg.peerDependencies || {})
	];

	console.log(
		`[VITE CONFIG] Auto-externalizing ${pkgDependencies.length} dependencies in ${pkg.name}...`
	);

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
				external: (id) => {
					if (id.startsWith('@repo/')) return true;
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
