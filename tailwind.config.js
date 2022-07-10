module.exports = {
    content: [
      "./src/**/*.{html,js,jsx,ts,tsx}"
    ],
    theme: {
      extend: {
        keyframes: {
          fadeIn: {
            '0%': { opacity: 0 },
            '100%': { opacity: 1 }
          }
        },
        animation: {
          'fadeIn': 'fadeIn .3s ease-in-out'
        }
      },
      screens: {
        'mobileL': { 'max': '425px' },
        'mobileM': { 'max': '375px' },
        'mobileS': { 'max': '320px' }
      }
    },
    plugins: [],
  }