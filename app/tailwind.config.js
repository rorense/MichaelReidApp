/** @type {import('tailwindcss').Config} */
module.exports = {
	// NOTE: Update this to include the paths to all of your component files.
	content: ["./app/**/*.{js,jsx,ts,tsx}"],
	presets: [require("nativewind/preset")],
	// Setting theme classes
	theme: {
		extend: {
			colors: {
				primary: "#7D1325",
				background: "#FFFBF6",
			},
			fontFamily: {
				DMSans: ["DM Sans", "sans-serif"],
			},
		},
	},
	plugins: [],
};
