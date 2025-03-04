/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        //If you want to keep the primary color you had, you can
        primary: {
          100: "#5B85AA",
          200: "#171123",
          300: "#414770",
        },
        //If you want to keep the secondary color you had, you can.
        secondary: {
          100: "#4C191B",
          200: "#963D5A",
          300: "#ECFFF8",
        },

      },
    },
  },
  plugins: [],
};