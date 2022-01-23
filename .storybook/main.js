module.exports = {
	stories: ['../src/components/**/*.stories.js'],
	addons: [
		'@storybook/preset-create-react-app',
		'@storybook/addon-actions',
		'@storybook/addon-knobs',
		{
			name: '@storybook/addon-docs',
			options: {
				configureJSX: true
			}
		},
		'@storybook/addon-a11y'
	],
	core: {
		builder: 'webpack5'
	}
};
