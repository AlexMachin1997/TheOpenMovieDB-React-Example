import type { StorybookConfig } from '@storybook/react-vite';

import { dirname } from 'path';

import { fileURLToPath } from 'url';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string) {
	return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
const config: StorybookConfig = {
	stories: [
		'../../../packages/**/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
		'../../../packages/**/src/**/*.mdx'
	],
	addons: [
		getAbsolutePath('@chromatic-com/storybook'),
		getAbsolutePath('@storybook/addon-vitest'),
		getAbsolutePath('@storybook/addon-a11y'),
		getAbsolutePath('@storybook/addon-docs')
	],
	framework: getAbsolutePath('@storybook/react-vite'),
	viteFinal: async (config) => {
		const { mergeConfig } = await import('vite');
		const tsconfigPaths = (await import('vite-tsconfig-paths')).default;
		const tailwindcss = (await import('@tailwindcss/vite')).default;

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
