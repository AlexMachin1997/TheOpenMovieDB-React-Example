import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
	stories: ['../src/components/**/*.stories.@(jsx|tsx)'],
	addons: [
		'@storybook/addon-a11y',
		'@chromatic-com/storybook',
		'@storybook/addon-docs'
	],
	framework: {
		name: '@storybook/react-vite',
		options: {
			strictMode: true
		}
	},
	viteFinal: async (config) => {
		// Add any Vite configuration here if needed
		return config;
	}
};

export default config;
