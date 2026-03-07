/**
 * Factory utility for consumer packages to inject their own directory into the
 * TypeScript import resolver. This prevents ESLint from walking up to the
 * monorepo root and spinning up massive, redundant TypeScript Program instances
 * when resolving path aliases (e.g. `~/components`).
 *
 * Usage in consuming packages:
 * ```js
 * import { config } from '@repo/eslint-config/react';
 * import { createConfig } from '@repo/eslint-config/utils';
 * export default createConfig(import.meta.dirname, config);
 * ```
 *
 * @param {string} packageDir - Absolute path to the consuming package directory (pass `import.meta.dirname`).
 * @param {...import("eslint").Linter.Config[]} baseConfigs - One or more ESLint config arrays to merge.
 * @returns {import("eslint").Linter.Config[]}
 */
export function createConfig(packageDir, ...baseConfigs) {
	return [
		...baseConfigs.flat(),
		{
			settings: {
				'import/resolver': {
					typescript: {
						alwaysTryTypes: true,
						project: './tsconfig.json',
						tsconfigRootDir: packageDir
					}
				}
			}
		}
	];
}
