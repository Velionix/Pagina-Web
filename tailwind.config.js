/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fbf6e9',
          100: '#f7ecc8',
          200: '#efd98c',
          300: '#e6c458',
          400: '#d4af37',
          500: '#c9a227',
          600: '#a8821d',
          700: '#85641a',
          800: '#5e4713',
          900: '#3a2c0d',
        },
        ink: {
          900: '#000000',
          800: '#050505',
          700: '#0a0a0b',
          600: '#101012',
          500: '#16161a',
          400: '#1d1d22',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      animation: {
        'spin-slow': 'spin 24s linear infinite',
        'spin-slower': 'spin 40s linear infinite reverse',
        'pulse-soft': 'pulseSoft 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
      },
      keyframes: {
        pulseSoft: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.9' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
