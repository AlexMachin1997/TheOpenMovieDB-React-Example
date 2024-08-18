import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
    stories: ['../src/**/*.stories.@(jsx|tsx)'],
    addons: [
        '@storybook/addon-essentials',
        '@storybook/addon-a11y',
        '@chromatic-com/storybook'
    ],

    framework: {
		name: '@storybook/react-vite',
		options: {
			strictMode: true
		}
	},

    docs: {},

    // Load static assets, this allows stuff such as the favicon to be displayed in the browser tab
    staticDirs: ['../public/'],

    typescript: {
        reactDocgen: 'react-docgen-typescript'
    }
};

export default config;
