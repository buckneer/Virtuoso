/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", 'sans-serif']
      },
      boxShadow: {
        'custom-card': '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
      },
      borderColor: {
        'custom-card': 'rgba( 255, 255, 255, 0.18 )',
      },
      backgroundColor: {
        'custom-card': 'rgba( 255, 255, 255, 0.25 )',
        'custom-hover': 'rgba( 11, 7, 7, 1 )',
      },

      borderRadius: {
        'custom-card': '10px',
      },
      backdropBlur: {
        'custom-card': '12px',
      },
    },
  },
  plugins: [],
}

