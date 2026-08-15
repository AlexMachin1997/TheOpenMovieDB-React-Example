import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import turboPlugin from 'eslint-plugin-turbo';
import tseslint from 'typescript-eslint';
import globals from 'globals';

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
	js.configs.recommended,
	eslintConfigPrettier,
	...tseslint.configs.recommended,
	tseslint.configs.eslintRecommended,
	{
		plugins: {
			turbo: turboPlugin
		},
		rules: {
			'turbo/no-undeclared-env-vars': 'error'
		}
	},
	{
		languageOptions: {
			ecmaVersion: 2020,
			globals: {
				...globals.browser,
				...globals.node,
				...globals.jest
			}
		}
	},
	{
		rules: {
			...eslintConfigPrettier.rules,
			'no-console': 'off',
			'@typescript-eslint/no-empty-function': 'off',
			'@typescript-eslint/no-var-requires': 'off',
			'import/extensions': 'off',
			// Keeps the `interface IFoo extends Bar {}` prop idiom legal — docs/16-type-hygiene/plan.md.
			'@typescript-eslint/no-empty-object-type': [
				'error',
				{ allowInterfaces: 'with-single-extends' }
			],
			'@typescript-eslint/no-explicit-any': 'error'
		}
	},
	{
		ignores: [
			'**/dist/**',
			'**/build/**',
			'**/coverage/**',
			'**/node_modules/**',
			// Standalone dev utility (ESLint timing profiler), not library source.
			'**/profile.js',
			'**/*.scss',
			'**/*.png',
			'**/.github/workflows/**/*.yml',
			'**/.next/**',
			'**/out/**',
			'**/storybook-static/**',
			'**/*.ttf',
			'**/*.woff',
			'**/*.woff2',
			'**/*.eot',
			'**/*.otf'
		]
	}
];
