module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        'todolistentry': '1fr 3fr'
      },
    },
  },
  variants: {
    extend: {
      transform: [ 'active', 'hover', ],
      animation: ['active',],
      scale: ['active',],
      transitionDuration: ['active', 'hover'],
  },
  },
  plugins: [],
}