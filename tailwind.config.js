module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 2s linear',
        'fade-in-down': 'fadeInDown 0.3s ease-out',
        'swing': 'swing 6s ease-in-out infinite alternate',
        'roll': 'roll 6s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeInDown: {
          '0%': { opacity: 0, transform: 'translateY(-10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        swing: {
          '0%, 100%': { transform: 'translateX(-10%) rotate(-5deg)' },
          '50%': { transform: 'translateX(10%) rotate(5deg)' },
        },
        roll: {
          '0%, 100%': {
            transform: 'translateX(-15%) rotate(-15deg)',
            'animation-timing-function': 'cubic-bezier(0.5, 0, 0.75, 0)'
          },
          '50%': {
            transform: 'translateX(15%) rotate(15deg)',
            'animation-timing-function': 'cubic-bezier(0.25, 1, 0.5, 1)'
          },
        }
      },
      fontFamily: {
        federant: ["'Federant'", "serif"],
        josefin: ["'Josefin Sans'", "sans-serif"],
        meie: ["'Meie Script'", "cursive"],
        michroma: ["'Michroma'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
