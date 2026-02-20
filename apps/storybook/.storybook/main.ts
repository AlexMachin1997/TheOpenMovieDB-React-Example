import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';

const config: StorybookConfig = {
	stories: [
		'../../../packages/**/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
		'../../../packages/**/src/**/*.mdx'
	],

	addons: [
		'@chromatic-com/storybook',
		'@storybook/addon-vitest',
		'@storybook/addon-a11y',
		'@storybook/addon-docs'
	],

	framework: {
		name: '@storybook/react-vite',
		options: {}
	},

	viteFinal: async (config) => {
		return mergeConfig(config, {
			plugins: [
				tsconfigPaths({
					projects: [
						'../../packages/ui-core/tsconfig.json',
						'../../packages/ui-command/tsconfig.json',
						'../../packages/ui-overlays/tsconfig.json',
						'../../packages/ui-forms/tsconfig.json'
					]
				}),
				tailwindcss()
			]
		});
	}
};

export default config;
