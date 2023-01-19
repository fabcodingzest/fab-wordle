/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        violet: {
          dark: '#5964E0',
          light: '#939BF4',
        },
        blue: {
          dark: '#19202D',
          midnight: '#121721',
        },

        grey: {
          light: '#F4F6F8',
          med: '#9DAEC2',
          dark: '#6E8098',
          btn: '#303642',
          hover: '#525861',
        },
      },
    },
  },
  plugins: [],
}
