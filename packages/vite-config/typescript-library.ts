import { defineConfig, type UserConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { createExternalMatcher, DTS_EXCLUDE } from './shared.js';

interface TypescriptLibraryOptions {
	/** Path to the library entry file (default: 'src/index.ts') */
	entry?: string;
	/** Library name */
	name?: string;
	/** Package names to externalize on top of the package's declared dependencies */
	externals?: string[];
	/** Declared dependencies to bundle into `dist/` anyway */
	bundle?: string[];
}

/**
 * Shared Vite configuration for pure TypeScript library packages.
 *
 * Includes:
 * - DTS generation
 * - Tree-shakeable output via preserveModules
 * - Externalization of `@repo/*` and the package's own declared dependencies
 * - No React, no Tailwind
 */
export const typescriptLibrary = (options: TypescriptLibraryOptions = {}): UserConfig => {
	const { entry = 'src/index.ts', externals = [], bundle = [] } = options;

	return defineConfig({
		plugins: [
			dts({
				include: ['src/**/*'],
				exclude: DTS_EXCLUDE
			})
		],

		resolve: {
			alias: {
				'~': `${process.cwd()}/src`
			}
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
			}
		}
	});
};
