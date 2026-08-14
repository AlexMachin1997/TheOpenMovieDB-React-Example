import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReact from 'eslint-plugin-react';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import { config as baseConfig } from './base.js';
// NOTE: eslint-plugin-storybook is intentionally not loaded. On Node 22 it triggers an
// ERR_REQUIRE_CYCLE_MODULE crash via storybook 10.2.16, which took the whole linter down.
// No Storybook rules were actually enabled, so removing it loses no coverage. Re-add once
// storybook + eslint-plugin-storybook are on a version without the require(esm) cycle.
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
			'react/display-name': 'off',
			'@typescript-eslint/no-unused-vars': 'off'
		}
	},

	// DISABLED: this block set `languageOptions.parser = projectStructureParser` on every
	// source file. In flat config the last matching `parser` wins, so it overrode the
	// TypeScript parser for all *.ts/*.tsx and every code rule (react-hooks, no-debugger,
	// exhaustive-deps, ...) ran against an empty AST and silently passed. Folder-structure
	// enforcement must be re-added in an ISOLATED config that does not share a parser with
	// code linting (see docs/16-conventions-lint/spec.md). Restoring code linting takes priority.
	//
	// {
	// 	files: ['**/*.{ts,tsx,js,jsx}'],
	// 	ignores: ['projectStructure.cache.json'],
	// 	languageOptions: { parser: projectStructureParser },
	// 	plugins: { 'project-structure': projectStructurePlugin },
	// 	rules: { 'project-structure/folder-structure': ['error', folderStructureConfig] }
	// }
];
