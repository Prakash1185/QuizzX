/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "poppins": "Poppins",
        "inter": "Inter"
      },
      colors: {
        "light2": "#C4DAD2",
        "light": "#e1e8f4",
        "dark": "#040D12"
      }
    },
  },
  plugins: [],
}