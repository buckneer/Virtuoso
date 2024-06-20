/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-card': '0 4px 30px rgba(0, 0, 0, 0.1)',
      },
      borderColor: {
        'custom-card': 'rgba( 255, 255, 255, 0.18 )',
      },
      backgroundColor: {
        'custom-card': 'rgba(0, 0, 0, 0.1)',
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

