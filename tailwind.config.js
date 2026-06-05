/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        kampus: {
          blue: "#04365b",
          gold: "#bda678",
          bg: "#f8fafc",
        },
      },
    },
  },
  plugins: [],
};
