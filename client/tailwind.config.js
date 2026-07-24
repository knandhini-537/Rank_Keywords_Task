/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        magicRed: {
          50: '#fff1f2',
          100: '#ffe4e6',
          500: '#e11d48',
          600: '#d97706',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
          DEFAULT: '#d9232d',
        },
        magicNavy: {
          50: '#f0f4f8',
          800: '#1b2a4a',
          900: '#0f172a',
          DEFAULT: '#1b2a4a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
