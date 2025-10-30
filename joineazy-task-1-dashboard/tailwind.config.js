/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef6ff",
          100: "#d9ebff",
          200: "#b8d8ff",
          300: "#8dbdff",
          400: "#5a98ff",
          500: "#2f6fff",
          600: "#1f54e6",
          700: "#1b45b9",
          800: "#1a3b93",
          900: "#182f70"
        }
      }
    }
  },
  plugins: []
};
