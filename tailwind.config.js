/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				brand: {
					50: '#e0e0e0',
					100: '#d4d4d4',
					200: '#bdbdbd',
					300: '#9c9c9c',
					400: '#737373',
					500: '#595959',
					600: '#474747',
					700: '#3b3b3b',
					800: '#303030',
					900: '#292929',
					950: '#000000'
				}
			}
		}
	},
	plugins: []
};
