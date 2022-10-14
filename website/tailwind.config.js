/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['src/**/*.tsx'],
	theme: {
		extend: {
			colors: {
				guilded: {
					gilded: '#F5C400',
					grey: {
						lightest: '#373943',
						light: '#32343d',
						dark: '#292b32',
						darkest: '#1e2025',
					},
					white: '#ececee',
				},
				typescript: {
					blue: '#3178c6',
				},
			},
		},
	},
};
