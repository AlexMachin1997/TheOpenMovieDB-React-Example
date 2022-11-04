module.exports = {
	extends: [
		'airbnb',
		'prettier',
		'eslint:recommended',
		'plugin:react-hooks/recommended',
		'plugin:react/recommended',
		'plugin:import/react',
		'plugin:storybook/recommended',
		'plugin:prettier/recommended',
		'plugin:tailwindcss/recommended'
	],
	plugins: ['prettier', 'react', 'tailwindcss'],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly'
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 2020,
		sourceType: 'module'
	},
	env: {
		browser: true,
		node: true,
		jest: true,
		es6: true
	},
	rules: {
		'tailwindcss/no-custom-classname': [
			1,
			{
				whitelist: ['^fa[-a-zA-Z0-9]*'] // Allows for the following custom css classnames e.g. fa-facebook, fa-2x, fa-facebook-s
			}
		],
		'import/no-cycle': 'off',
		'import/no-extraneous-dependencies': [
			'error',
			{
				devDependencies: ['.storybook/**', './src/components/**/*.stories.js', '**/*.test.js']
			}
		],
		'no-misleading-character-class': 'off',
		'no-irregular-whitespace': 'off',
		'no-plusplus': 'off',
		'react/jsx-props-no-spreading': 'off',
		'react/function-component-definition': [
			2,
			{
				namedComponents: 'arrow-function',
				unnamedComponents: 'arrow-function'
			}
		],
		'react/style-prop-object': 'off',
		'no-debugger': 0,
		'no-alert': 0,
		'no-await-in-loop': 0,
		'no-return-assign': ['error', 'except-parens'],
		'no-restricted-syntax': [2, 'ForInStatement', 'LabeledStatement', 'WithStatement'],
		'no-unused-vars': 'error',
		'prefer-const': [
			'error',
			{
				destructuring: 'all'
			}
		],
		'arrow-body-style': [2, 'as-needed'],
		'no-unused-expressions': [
			2,
			{
				allowTaggedTemplates: true
			}
		],
		'no-param-reassign': [
			2,
			{
				props: false
			}
		],
		'no-console': 0,
		'import/prefer-default-export': 0,
		'func-names': 0,
		'space-before-function-paren': 0,
		'comma-dangle': 0,
		'max-len': 0,
		'import/extensions': 0,
		'no-underscore-dangle': 0,
		'react/display-name': 0,
		'react/no-array-index-key': 0,
		'react/react-in-jsx-scope': 2,
		'react/prefer-stateless-function': 0,
		'react/forbid-prop-types': 0,
		'react/no-unescaped-entities': 0,
		'react/require-default-props': 2,
		'react/jsx-filename-extension': [
			1,
			{
				extensions: ['.js', '.jsx']
			}
		],
		radix: 0,
		'no-shadow': [
			2,
			{
				hoist: 'all',
				allow: ['resolve', 'reject', 'done', 'next', 'err', 'error']
			}
		],
		quotes: [
			2,
			'single',
			{
				avoidEscape: true,
				allowTemplateLiterals: true
			}
		],
		'prettier/prettier': [
			'error',
			{
				singleQuote: true,
				endOfLine: 'auto'
			}
		],
		'react-hooks/rules-of-hooks': 0,
		'react-hooks/exhaustive-deps': 'error',
		'jsx-quotes': ['error', 'prefer-single'],

		// Can't always apply appy dom ids or additional aria-[name] to elements so we allow some nesting or an id
		'jsx-a11y/label-has-associated-control': [
			'error',
			{
				required: {
					some: ['nesting', 'id']
				}
			}
		],
		'jsx-a11y/label-has-for': [
			'error',
			{
				required: {
					some: ['nesting', 'id']
				}
			}
		]
	}
};
