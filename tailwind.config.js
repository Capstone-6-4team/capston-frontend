module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'representative-color': '#45bfc9'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
