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
          midnight: '#121721',
        },

        grey: {
          light: '#F4F6F8',
          med: '#9DAEC2',
          dark: '#6E8098',
          darkest: '#525861',
        },
      },
      keyframes: {
        flip: {
          '0%': {
            transform: 'rotateX(0)',
          },
          '45%': {
            transform: 'rotateX(90deg)',
          },
          '55%': {
            transform: 'rotateX(90deg)',
          },
          '100%': {
            transform: 'rotateX(0deg)',
          },
        },
        'bounce-once': {
          '0%': {
            transform: 'scale(1)',
            border: 'border-grey-dark',
          },
          '50%': {
            transform: 'scale(1.2)',
            border: '1px solid black',
          },
          '100%': {
            transform: 'scale(1)',
            border: '1px solid black',
          },
        },
      },
      animation: {
        'flip-1': 'flip 0.1s ease-in-out',
        'flip-2': 'flip 0.3s ease-in-out',
        'flip-3': 'flip 0.5s ease-in-out',
        'flip-4': 'flip 0.7s ease-in-out',
        'flip-5': 'flip 0.9s ease-in-out',
        'bounce-once': 'bounce-once 0.2s ease-in-out',
      },
    },
  },
  plugins: [],
}
