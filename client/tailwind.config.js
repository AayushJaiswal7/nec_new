/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
       primaryColor:'#FF7F42',
       secondaryColor: '#FFEFE7',
       primaryBackground: '#FFF7F3',
      },
      textColor: {
        DEFAULT:'#535862'
      },
    },
  },
  variants: {
    extend: {
      transform: ['hover'],
    },
  },
  plugins: [],
}