import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import remarkGfm from 'remark-gfm';

const config: StorybookConfig = {
	// `packages/*/src`, not `packages/**/src`. pnpm symlinks every workspace package into its
	// dependents' `node_modules/@repo/`, so `**` also matches
	// `packages/ui-forms/node_modules/@repo/ui-core/src` — and the nested hops beyond it. The dev
	// server tolerates that, but `@storybook/addon-vitest` turns the same matches into test files,
	// which collects every ui-core story five times over; none of the copies can be served through
	// that path, so each fails to import and leaves a Vite error overlay in the shared page.
	stories: [
		'../../../packages/*/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
		'../../../packages/*/src/**/*.mdx'
	],

	addons: [
		'@chromatic-com/storybook',
		'@storybook/addon-vitest',
		'@storybook/addon-a11y',
		{
			name: '@storybook/addon-docs',
			options: {
				mdxPluginOptions: {
					mdxCompileOptions: {
						remarkPlugins: [remarkGfm]
					}
				}
			}
		}
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
