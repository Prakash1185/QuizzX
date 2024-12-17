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
        // "light2": "#C4DAD2",
        // "light": "#F5EFFF",
        // "dark": "#040D12",
        "finalDark":"#04070D",
        "Ngreen":"#058c42",
        "Dgreen":"#056a2f",
        "dark2":"#010409",
      }
    },
  },
  plugins: [],
}