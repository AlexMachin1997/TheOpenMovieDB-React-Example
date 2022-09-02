module.exports = {
	stories: ['../src/components/**/*.stories.js'],
	addons: [
		'@storybook/preset-create-react-app',
		'@storybook/addon-actions',
		{
			name: '@storybook/addon-docs',
			options: {
				configureJSX: true
			}
		},
		'@storybook/addon-a11y'
	],
	features: {
		storyStoreV7: true
	},
	core: {
		builder: {
			name: 'webpack5',
			options: {
				lazyCompilation: true,
				fsCache: true
			}
		}
	},
	framework: '@storybook/react'
};
