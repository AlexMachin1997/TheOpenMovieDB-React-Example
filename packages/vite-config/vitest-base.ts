import { defineConfig } from 'vitest/config';
import path from 'node:path';
import { TEST_GLOBS } from './shared.js';

const srcAlias = () => ({
	'~': path.resolve(process.cwd(), './src')
});

/**
 * Shared Vitest configuration for library packages.
 *
 * `vitestNodePreset` — node environment, for pure logic (utilities, services,
 * and hooks that don't touch the DOM). `vitestJsdomPreset` — jsdom environment,
 * for hooks/components that need a DOM (e.g. Testing Library `renderHook`/`render`
 * to assert reactivity). Rich component behaviour is still primarily covered by
 * Storybook `play()` tests. `passWithNoTests` keeps packages that are wired but
 * not yet tested green in `turbo run test`.
 *
 * Path alias: `~` -> `./src` (matches the build presets).
 */
export const vitestNodePreset = () =>
	defineConfig({
		resolve: {
			alias: srcAlias()
		},
		test: {
			globals: true,
			environment: 'node',
			include: TEST_GLOBS,
			passWithNoTests: true
		}
	});

/**
 * jsdom variant of {@link vitestNodePreset}, for packages with DOM/hook tests.
 * Requires `jsdom` and `@testing-library/react` as devDependencies of the package.
 */
export const vitestJsdomPreset = () =>
	defineConfig({
		resolve: {
			alias: srcAlias()
		},
		test: {
			globals: true,
			environment: 'jsdom',
			include: TEST_GLOBS,
			passWithNoTests: true
		}
	});
