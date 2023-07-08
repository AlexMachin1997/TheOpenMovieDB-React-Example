import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
	stories: ['../src/**/*.stories.@(jsx|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		{
			name: '@storybook/addon-styling',
			options: {}
		}
	],
	framework: {
		name: '@storybook/react-vite',
		options: {
			strictMode: true
		}
	},
	docs: {
		autodocs: 'tag'
	}
};

export default config;