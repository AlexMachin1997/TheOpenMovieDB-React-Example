module.exports = {
	stories: ['../src/components/**/*.stories.js'],
	addons: [
		'@storybook/preset-create-react-app',
		'@storybook/addon-actions',
		'@storybook/addon-links',
		'@storybook/addon-knobs/register',
		{
			name: '@storybook/addon-docs',
			options: {
				configureJSX: true
			}
		},
		'@storybook/addon-a11y/register'
	]
};
