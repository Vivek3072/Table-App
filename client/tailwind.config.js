/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00a3ff",
        primaryGreen: "#3F9296",
        primaryOrange: "#F59D20",
        primaryPink: "#E27181",
        lightPink: "#F9E2DE",
      },
    },
  },
  plugins: [],
};
