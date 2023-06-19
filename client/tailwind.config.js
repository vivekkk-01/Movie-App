/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#171717",
        secondary: "#272727",
        "dark-subtle": "rgba(255,255,255,.5)",
        "light-subtle": "rgba(39,39,39,.5)",
        "highlight-dark": "#ffc200",
        highlight: "#d98600"
      }
    },
    screens: {
      tab: { "max": "850px", },
      xs: { "max": "470px" },
    }
  },
  plugins: [],
}

