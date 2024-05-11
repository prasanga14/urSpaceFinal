/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#010851',
        secondary: '#9A7AF1',
        tartiary: '#707070',
        pink: '#EE9AE5',
        ideBg: '#f2f2f2',
        gunmetal: '#1C1B27',
        green: '#4aed88',
        editorbg: '#282A36',
      },
      width: {
        boxwidth: '500px',
      },
      height: {
        boxheight: '300px',
      },
    },
  },
  plugins: [],
};
