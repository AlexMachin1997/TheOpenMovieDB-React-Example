import { config as reactConfig } from '@repo/eslint-config/react';

// CI-specific ESLint configuration with stricter rules for production builds
export default [
	...reactConfig,
	{
		// Exclude large static files that slow down linting (replaces .eslintignore for ESLint 9+)
		ignores: [
			'src/settings.ts', // 2,485 lines of static data - major performance bottleneck
			'**/*.min.js',
			'**/dist/**',
			'**/build/**',
			'**/coverage/**',
			'**/node_modules/**',
			'**/.turbo/**',
			'**/.cache/**',
			'**/public/**',
			'**/webfonts/**',
			'*.config.js',
			'*.config.ts',
			'postcss.config.cjs',
			'tailwind.config.cjs',
			'vite-env.d.ts'
		]
	},
	{
		rules: {
			// CI: Re-enable important rules for production (slower but more thorough)
			'import/extensions': [
				'error',
				'ignorePackages',
				{
					'': 'never',
					'~': 'never',
					'~/components': 'never',
					'~/hooks': 'never',
					'~/services': 'never',
					'~/types': 'never',
					'~/utils': 'never',
					'~/assets': 'never',
					'~/test': 'never'
				}
			],
			'@typescript-eslint/no-unused-vars': 'error',
			'react/display-name': 'warn',

			// Still disable the most expensive import rules even in CI
			'import/named': 'off',
			'import/namespace': 'off',
			'import/default': 'off',
			'import/no-named-as-default-member': 'off',
			'import/no-unresolved': 'off',
			'import/no-extraneous-dependencies': 'off',
			'import/no-named-as-default': 'off',
			'import/no-cycle': 'off',
			'import/no-unused-modules': 'off',
			'import/no-deprecated': 'off'
		}
	}
];
