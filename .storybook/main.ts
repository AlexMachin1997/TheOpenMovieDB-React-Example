import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
	stories: ['../src/**/*.stories.@(jsx|tsx)'],
	addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
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
