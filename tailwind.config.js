/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        xianxia: {
          bg: '#0d1117',
          panel: 'rgba(22, 27, 34, 0.85)',
          border: '#30363d',
          gold: '#e3b341',
          cyan: '#38bdf8',
          emerald: '#34d399',
          crimson: '#f87171',
        }
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', '"Songti SC"', 'SimSun', 'serif'],
      }
    },
  },
  plugins: [],
}

