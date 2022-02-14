/* eslint-disable global-require */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
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
			boxShadow: {
				card: '0 2px 8px rgba(0, 0, 0, 0.1)'
			}
		}
	},
	plugins: [require('@tailwindcss/line-clamp')]
};
