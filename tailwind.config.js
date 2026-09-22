/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#effdf8",
          100: "#d7f8ee",
          200: "#afeedc",
          300: "#7fdec7",
          400: "#4cc8ad",
          500: "#27ad94",
          600: "#198d78",
          700: "#187160",
          800: "#195a4e",
          900: "#194a41"
        }
      },
      boxShadow: {
        soft: "0 10px 30px rgba(15, 23, 42, .07)"
      }
    },
  },
  plugins: [],
};