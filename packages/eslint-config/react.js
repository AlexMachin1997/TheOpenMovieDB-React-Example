import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReact from 'eslint-plugin-react';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import pluginStorybook from 'eslint-plugin-storybook';
import { config as baseConfig } from './base.js';
import { projectStructureParser, projectStructurePlugin } from 'eslint-plugin-project-structure';
import { folderStructureConfig } from './folderStructure.mjs';

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

	// Must stay ABOVE the rules block below: `flat/recommended` turns `react-hooks/rules-of-hooks`
	// off on story files, and the block below is what restores it. See this package's README.
	...pluginStorybook.configs['flat/recommended'],

	{
		plugins: {
			'react-hooks': pluginReactHooks,
			'react-refresh': pluginReactRefresh,
			react: pluginReact,
			'jsx-a11y': jsxA11y
		},
		settings: {
			react: {
				version: 'detect'
			}
		},
		rules: {
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'error',
			'react-refresh/only-export-components': ['error', { allowConstantExport: true }],
			'react/function-component-definition': [
				2,
				{
					namedComponents: 'arrow-function',
					unnamedComponents: 'arrow-function'
				}
			],
			'react/no-unknown-property': 'off',
			'jsx-a11y/label-has-associated-control': [
				2,
				{
					assert: 'either'
				}
			],
			// React 17+ JSX transform rules
			'react/jsx-uses-react': 'off',
			'react/react-in-jsx-scope': 'off',
			'react/jsx-props-no-spreading': 'off',
			'react/jsx-filename-extension': 'off',
			'react/require-default-props': 'off',
			'react/prop-types': 'off',
			'react/display-name': 'error',
			'@typescript-eslint/naming-convention': [
				'error',
				{ selector: 'interface', format: ['PascalCase'], prefix: ['I'] }
			],
			'@typescript-eslint/no-unused-vars': 'off'
		}
	}

	// DISABLED: this block set `languageOptions.parser = projectStructureParser` on every
	// source file. In flat config the last matching `parser` wins, so it overrode the
	// TypeScript parser for all *.ts/*.tsx and every code rule (react-hooks, no-debugger,
	// exhaustive-deps, ...) ran against an empty AST and silently passed. Folder-structure
	// enforcement must be re-added in an ISOLATED config that does not share a parser with
	// code linting. Restoring code linting takes priority.
	//
	// {
	// 	files: ['**/*.{ts,tsx,js,jsx}'],
	// 	ignores: ['projectStructure.cache.json'],
	// 	languageOptions: { parser: projectStructureParser },
	// 	plugins: { 'project-structure': projectStructurePlugin },
	// 	rules: { 'project-structure/folder-structure': ['error', folderStructureConfig] }
	// }
];
