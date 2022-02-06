/* eslint-disable global-require */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			backgroundColor: {
				primary: 'var(--primary)',
				secondary: 'var(--secondary)',
				tertiary: 'var(--tertiary)'
			}
		}
	},
	plugins: [require('@tailwindcss/line-clamp')]
};
