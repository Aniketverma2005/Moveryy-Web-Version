// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        'primary-blue': '#4285F4',
        blue: {
          50: '#EBF2FF',
          100: '#D6E4FF',
          200: '#B3CCFF',
          300: '#80A9FF',
          400: '#4D7FFF',
          500: '#4285F4',
          600: '#4285F4',
          700: '#3367D6',
          800: '#2952B8',
          900: '#1E3A8A',
        }
      },
    },
  },
  plugins: [],
}