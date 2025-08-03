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
			'@typescript-eslint/no-var-requires': 'off'
		}
	},
	{
		ignores: [
			'dist/**',
			'build/**',
			'coverage/**',
			'node_modules/**',
			'**/*.scss',
			'*.png',
			'.github/workflows/**/*.yml'
		]
	}
];
