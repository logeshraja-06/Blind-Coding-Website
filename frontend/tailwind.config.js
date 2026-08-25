/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teaGreen: {
          DEFAULT: '#C8D696',
          50: '#F6F9EE',
          100: '#EEF3DE',
          200: '#DEE8BE',
          300: '#C8D696',
          400: '#B0C272',
          500: '#94A84E',
          600: '#758737',
        },
        vanilla: {
          DEFAULT: '#F6E6A5',
          50: '#FDFBF4',
          100: '#FAF6E3',
          200: '#F6E6A5',
          300: '#EED575',
          400: '#E4BF44',
          500: '#C8A224',
        },
        celticBlue: {
          DEFAULT: '#3971B8',
          50: '#EFF5FC',
          100: '#D7E5F8',
          200: '#B2CEF1',
          300: '#80AFE7',
          400: '#4D8CDB',
          500: '#3971B8',
          600: '#285590',
          700: '#1C3E6C',
          800: '#132B4D',
          900: '#0C1B31',
        },
        ivory: {
          DEFAULT: '#FBFCEE',
          50: '#FFFFFF',
          100: '#FBFCEE',
          200: '#F5F7D8',
          300: '#ECF0BE',
          400: '#E0E79D',
        },
        drabDark: {
          DEFAULT: '#343B1B',
          50: '#F3F4EE',
          100: '#E2E5D3',
          200: '#C3C9A6',
          300: '#9EA872',
          400: '#677138',
          500: '#4E5728',
          600: '#343B1B',
          700: '#282E15',
          800: '#1C200E',
          900: '#101308',
        }
      },
      fontFamily: {
        comfortaa: ['Comfortaa', 'cursive', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 4px 20px -2px rgba(52, 59, 27, 0.06)',
        'premium': '0 10px 30px -5px rgba(57, 113, 184, 0.12), 0 4px 12px -2px rgba(52, 59, 27, 0.04)',
        'elevated': '0 20px 40px -10px rgba(57, 113, 184, 0.18)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(52, 59, 27, 0.05)',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-reverse': 'floatReverse 9s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(3deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(14px) rotate(-3deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
