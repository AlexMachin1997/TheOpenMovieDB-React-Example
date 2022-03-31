/* eslint-disable global-require */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			backgroundColor: {
				primary: 'var(--primary)',
				secondary: 'var(--secondary)',
				tertiary: 'var(--tertiary)'
			},
			textColor: {
				primary: 'var(--primary)',
				secondary: 'var(--secondary)',
				tertiary: 'var(--tertiary)'
			},
			fontFamily: {
				karla: ['Karla', 'sans-serif']
			},
			margin: {
				auto: '0 auto'
			}
		}
	},
	plugins: [require('@tailwindcss/line-clamp')]
};
