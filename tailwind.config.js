/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({addUtilities}) {
      const extendLineThrough = {
          '.line-through': {
              'textDecoration': 'line-through',
              'text-decoration-thickness': '1.5px'
          },
      }
      addUtilities(extendLineThrough)
    },
  ],
}

