/* eslint-disable global-require */
module.exports = {
	// Provide a list of all of the files where we want to use Tailwind, so any javascript file in /src (typescript, typescript react, javascript etc)
	content: ['./src/**/*.{js,jsx,ts,tsx}'],

	// By default the media is used which mean's it will use the operating systems preference e.g. light or dark. Though we want to control dark mode via a className
	darkMode: 'class',

	// Provide properties to override/extend the default Tailwind theme
	theme: {
		extend: {
			// Create new background properties
			backgroundColor: {
				primary: 'var(--primary)',
				secondary: 'var(--secondary)',
				tertiary: 'var(--tertiary)'
			},

			// Create new text properties
			textColor: {
				primary: 'var(--primary)',
				secondary: 'var(--secondary)',
				tertiary: 'var(--tertiary)'
			},

			// Create new margin properties
			margin: {
				auto: '0 auto'
			}
		}
	},
	plugins: [
		// Enables to use the line clamp functionality, you can easily specifiy the number of lines you want to use.
		require('@tailwindcss/line-clamp')
	]
};
