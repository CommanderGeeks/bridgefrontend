/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#06070C",
      },
      fontFamily: {
        Gilroy: ["Gilroy"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
