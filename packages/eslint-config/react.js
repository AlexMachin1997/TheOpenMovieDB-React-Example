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

	// This spread MUST stay ABOVE the rules block below — the ordering is the only thing keeping it
	// safe. `flat/recommended`'s stories entry is scoped to `**/*.stories.*` and sets
	// `react-hooks/rules-of-hooks` to 'off'. The block below has no `files` key, so it matches every
	// file, and flat config resolves last-match-wins per rule: from here, the repo's 'error' is
	// restored for stories and only the `storybook/*` rules are added. Below the block, Storybook
	// would silently disable rules-of-hooks across every story file — the same invisible
	// degradation the project-structure parser caused, and that rule is what caught a real
	// conditional-hook bug in CommandSearch.
	//
	// It also disables `import-x/no-anonymous-default-export`; that plugin is not installed here,
	// which is harmless because ESLint skips plugin resolution for a rule set to 'off'.
	//
	// The plugin was previously removed because it crashed ESLint at config load with
	// ERR_REQUIRE_CYCLE_MODULE. That is a Node 22 `require(esm)` restriction, not a version
	// mismatch: on these exact versions it still crashes on Node 22.23.2 and imports cleanly on
	// 24.18.1. The repo pins Node 24, so it is safe — but note the pin has to hold for the
	// *system* Node too, since turbo spawns tasks through that rather than through fnm's shim.
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
			'react/display-name': 'off',
			'@typescript-eslint/no-unused-vars': 'off'
		}
	},

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
