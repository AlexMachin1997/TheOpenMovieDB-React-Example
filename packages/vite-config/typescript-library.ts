import { defineConfig, type UserConfig } from 'vite';
import dts from 'vite-plugin-dts';

interface TypescriptLibraryOptions {
	/** Path to the library entry file (default: 'src/index.ts') */
	entry?: string;
	/** Library name */
	name?: string;
	/** Additional external dependencies */
	externals?: string[];
}

/**
 * Shared Vite configuration for pure TypeScript library packages.
 *
 * Includes:
 * - DTS generation
 * - Tree-shakeable output via preserveModules
 * - No React, no Tailwind
 */
export const typescriptLibrary = (options: TypescriptLibraryOptions = {}): UserConfig => {
	const { entry = 'src/index.ts', externals = [] } = options;

	return defineConfig({
		plugins: [
			dts({
				include: ['src/**/*'],
				exclude: ['src/**/*.test.ts']
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
				external: [/^@repo\/.*/, ...externals],
				output: {
					preserveModules: true,
					preserveModulesRoot: 'src',
					entryFileNames: '[name].js'
				}
			}
		}
	});
};
