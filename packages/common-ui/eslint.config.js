import { config as reactConfig } from '@repo/eslint-config/react';

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export default [
	...reactConfig,
	{
		rules: {
			// PERFORMANCE OPTIMIZATION: Disable the slowest rule (332ms, 29.8% of lint time)
			// The import/extensions rule is very slow with complex path mappings
			// TypeScript already enforces this when using moduleResolution node16/nodenext
			'import/extensions': 'off',

			// PERFORMANCE OPTIMIZATION: Replace slow TypeScript rule with faster alternative
			// @typescript-eslint/no-unused-vars was taking 217ms (19.5% of lint time)
			'@typescript-eslint/no-unused-vars': 'off',
			'no-unused-vars': 'off', // Use TypeScript's built-in checking instead

			// PERFORMANCE OPTIMIZATION: Disable expensive React rule
			// react/display-name was taking 115ms (10.4% of lint time)
			'react/display-name': 'off',

			// Disable slow import rules that TypeScript already checks (per typescript-eslint docs)
			'import/named': 'off',
			'import/namespace': 'off',
			'import/default': 'off',
			'import/no-named-as-default-member': 'off',
			'import/no-unresolved': 'off',
			'import/no-extraneous-dependencies': 'off',
			// These are expensive - consider enabling only in CI
			'import/no-named-as-default': 'off',
			'import/no-cycle': 'off',
			'import/no-unused-modules': 'off',
			'import/no-deprecated': 'off'
		}
	}
];
