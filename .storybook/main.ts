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
	},

	// Load static assets, this allows stuff such as the favicon to be displayed in the browser tab
	staticDirs: ['../public/']
};

export default config;
