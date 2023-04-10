/* eslint-disable global-require */
module.exports = {
	// Provide a list of all of the files where we want to use Tailwind, so any javascript file in /src (typescript, typescript react, javascript etc)
	content: ['./src/**/*.{js,jsx,ts,tsx}'],

	// By default the media is used which mean's it will use the operating systems preference e.g. light or dark. Though we want to control dark mode via a className
	darkMode: 'class',

	// Provide properties to override/extend the default Tailwind theme
	theme: {
		extend: {
			/*

			Tailwind "colors" theme config:

			- The colors key allows you to customize the global color palette for your project.

			- By default, these colors are inherited by all color-related core plugins, like backgroundColor, borderColor, textColor, and others.

			- By default you can apply a hex code, though if you want to use modifiers they need to be rgb, hsl or rgba values.

			- If no "modifier" is applied it defaults to opacity 100 (I believe)

			Example':

			.bg-primary

			.bg-primary/25

			.text-tertiary/80

			*/
			colors: {
				// Add the primary color to the Tailwind's theme (Changes depending on the theme class applied e.g. .light or .dark)
				primary: 'rgb(var(--primary) / <alpha-value>)',

				// Add the secondary color to the Tailwind's theme (Changes depending on the theme class applied e.g. .light or .dark)
				secondary: 'rgb(var(--secondary) / <alpha-value>)',

				// Add the tertiary color to the Tailwind's theme (Changes depending on the theme class applied e.g. .light or .dark)
				tertiary: 'rgb(var(--tertiary) / <alpha-value>)'
			},

			// Create new margin properties
			spacing: {
				'ml-auto': 'auto'
			}
		}
	},

	variants: {
		scrollbar: ['rounded']
	},

	plugins: [
		// Enables to use the line clamp functionality, you can easily specifiy the number of lines you want to use.
		require('@tailwindcss/line-clamp'),
		require('tailwind-scrollbar')
	]
};
