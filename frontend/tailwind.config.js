import { Theme } from "./src/objects/Theme";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class", '[class*="dark"]'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: Theme.getTailwindColorsTheme()
    },
  },
  plugins: [],
}