/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'spin-slow': 'spin 6s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
}
