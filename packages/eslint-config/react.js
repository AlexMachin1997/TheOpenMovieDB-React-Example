import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReact from 'eslint-plugin-react';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import storybook from 'eslint-plugin-storybook';
import { config as baseConfig } from './base.js';

/**
 * A comprehensive ESLint configuration for React applications.
 * Extends the base configuration with React-specific plugins and rules.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const config = [
	...baseConfig,
	pluginReact.configs.flat.recommended,
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true
				}
			}
		}
	},
	{
		plugins: {
			'react-hooks': pluginReactHooks,
			'react-refresh': pluginReactRefresh,
			react: pluginReact,
			'jsx-a11y': jsxA11y,
			import: importPlugin,
			storybook: storybook
		},
		settings: {
			react: {
				version: 'detect'
			},
			'import/extensions': ['.ts', '.tsx'],
			'import/parsers': {
				'@typescript-eslint/parser': ['.ts', '.tsx']
			},
			'import/resolver': {
				node: {
					extensions: ['.ts', '.tsx', '.js', '.jsx']
				}
			}
		},
		rules: {
			...pluginReactHooks.configs.recommended.rules,
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'error',
			'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
			'react/function-component-definition': [
				2,
				{
					namedComponents: 'arrow-function',
					unnamedComponents: 'arrow-function'
				}
			],
			'react/no-unknown-property': 'off',
			'import/no-extraneous-dependencies': [
				'error',
				{
					devDependencies: true
				}
			],
			'jsx-a11y/label-has-associated-control': [
				2,
				{
					assert: 'either'
				}
			],
			'import/extensions': [
				'error',
				'ignorePackages',
				{
					js: 'never',
					jsx: 'never',
					ts: 'never',
					tsx: 'never',
					mjs: 'never'
				}
			],
			// React 17+ JSX transform rules
			'react/jsx-uses-react': 'off',
			'react/react-in-jsx-scope': 'off',
			'react/jsx-props-no-spreading': 'off',
			'react/jsx-filename-extension': 'off',
			'react/require-default-props': 'off',
			'react/prop-types': 'off'
		}
	}
];
