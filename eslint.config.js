import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import react from 'eslint-plugin-react';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import storybook from 'eslint-plugin-storybook';

export default tseslint.config({
	ignores: [
		'**/*.scss',
		'coverage/**',
		'node_modules/**',
		'dist/**',
		'build/**',
		'.github/workflows/**/*.yml',
		'build/*.js',
		'*.png',
		'./webfonts/'
	],
	extends: [
		js.configs.recommended,
		...tseslint.configs.recommended,
		tseslint.configs.eslintRecommended,
		reactRecommended
	],
	files: ['**/*.{ts,tsx}'],
	languageOptions: {
		ecmaVersion: 2020,
		globals: {
			...globals.browser,
			...globals.node,
			...globals.jest
		},
		parserOptions: {
			ecmaFeatures: {
				jsx: true
			},
			// Performance optimizations for TypeScript parser
			project: './tsconfig.json',
			tsconfigRootDir: import.meta.dirname,
			// Disable expensive type-aware rules for better performance
			experimentalDecorators: true,
			emitDecoratorMetadata: true
		}
	},
	plugins: {
		'react-hooks': reactHooks,
		'react-refresh': reactRefresh,
		react: react,
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
		...eslintConfigPrettier.rules,
		...reactHooks.configs.recommended.rules,
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'error',
		'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
		'no-console': 'off',
		'react/function-component-definition': [
			2,
			{
				namedComponents: 'arrow-function',
				unnamedComponents: 'arrow-function'
			}
		],
		'react/no-unknown-property': ['off'], // unknown properties (e.g. x-placement) are used for bootstrap
		'import/no-extraneous-dependencies': [
			'error',
			{
				devDependencies: true
			}
		],
		'jsx-a11y/label-has-associated-control': [
			2,
			{
				assert: 'either' // either check for `htmlFor` or `nesting`
			}
		],
		'@typescript-eslint/no-empty-function': [0],
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
		/*
      ************************************************************************************************
      Description of why these are turned off for the project:
      ************************************************************************************************
      - In React 17 a new runtime JSX transform was created, this will allow us to safely ignore the React import when it's not required.
      - When not using useEffect, useCallback, useState etc we no longer need "React" to be scope if React is required then the runtime transform
        will automatically add it (Smart right!)
      - For more information visit https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#removing-unused-react-imports
      */
		'react/jsx-uses-react': 'off',
		'react/react-in-jsx-scope': 'off',
		'@typescript-eslint/no-var-requires': 0,
		'react/jsx-props-no-spreading': 0,
		'react/jsx-filename-extension': 0,
		'react/require-default-props': 0,
		'react/prop-types': 0
	}
});
