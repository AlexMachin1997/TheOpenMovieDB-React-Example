import { defineConfig } from 'vitest/config';
import path from 'node:path';
import { TEST_GLOBS } from './shared.js';

/**
 * Shared Vitest configuration for library packages.
 *
 * Node environment only — Vitest here covers pure logic (utilities, hooks,
 * services). Component behaviour is tested via Storybook `play()` tests, and
 * the jsdom + Testing Library preset is added when the first DOM/hook test
 * needs it. `passWithNoTests` keeps packages that are wired but not yet tested
 * green in `turbo run test`.
 *
 * Path alias: `~` -> `./src` (matches the build presets).
 */
export const vitestNodePreset = () =>
	defineConfig({
		resolve: {
			alias: {
				'~': path.resolve(process.cwd(), './src')
			}
		},
		test: {
			globals: true,
			environment: 'node',
			include: TEST_GLOBS,
			passWithNoTests: true
		}
	});
