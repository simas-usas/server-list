/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#484d73",
        secondary: "#fcfcfd",
      },
      backgroundImage: {
        "default": "url('./src/assets/background-image.svg')"
      }
    },
  },
  plugins: [],
}

