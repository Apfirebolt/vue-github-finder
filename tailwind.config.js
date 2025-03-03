/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkNavy: "#1A202C",
        lightGray: "#E2E8F0",
        white: "#FFFFFF",
        lightBlue: "#4299E1",
        goldenOrange: "#F6AD55",
        mediumGray: "#718096",
        //If you want to keep the primary color you had, you can
        primary: "#FF6363",
        //If you want to keep the secondary color you had, you can.
        secondary: {
          100: "#E2E2D5",
          200: "#888883",
        },
      },
    },
  },
  plugins: [],
};