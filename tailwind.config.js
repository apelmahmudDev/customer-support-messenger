/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				["off-white"]: "#F6F3F2",
				["dark-primary"]: "#2C2C2C",
				["dark-secondary"]: "#3E3E3E",
				["lighter-gray"]: "#545454",
				gray: "#898989",
				purple: "#763CD4",
			},
		},
	},
	plugins: [],
};
