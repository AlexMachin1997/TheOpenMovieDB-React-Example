module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
		jest: true
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'airbnb',
		'prettier',
		'plugin:react-hooks/recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:storybook/recommended'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
	plugins: ['prettier', 'react', 'react-hooks', '@typescript-eslint', 'react-refresh'],
	settings: {
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
	ignorePatterns: ['**/*.scss'],
	rules: {
		'react-refresh/only-export-components': 'warn',
		'prettier/prettier': 'error',
		'no-console': 'off',
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'error',
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
		// 'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx',] }], TODO: Re-enable once the files have been converted to typescript
		'react/jsx-filename-extension': 0,
		'react/require-default-props': 0,
		'react/prop-types': 0
	}
	// "root": true
};
