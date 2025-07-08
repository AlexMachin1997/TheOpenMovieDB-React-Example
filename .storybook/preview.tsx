import type { Preview } from '@storybook/react-vite';

import { withThemeByClassName } from '@storybook/addon-themes';

import '../src/index.scss';

const preview: Preview = {
	decorators: [
		// Adds theme switching support.
		// NOTE: requires setting "darkMode" to "class" in your tailwind config
		withThemeByClassName({
			themes: {
				light: 'light',
				dark: 'dark'
			},
			defaultTheme: 'light'
		})
	],

	tags: ['autodocs', 'autodocs']
};

export default preview;
