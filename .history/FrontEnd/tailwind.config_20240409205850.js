/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        orange: '#FB5430',
        blue: '#0583F2',
        whiteblue: '#EDF6FF'
      }
    }
  },
  plugins: []
}
