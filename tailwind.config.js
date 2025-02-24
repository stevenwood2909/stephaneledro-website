/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff9e6',
          100: '#fff3cc',
          200: '#ffe799',
          300: '#e9e164',
          400: '#d2944c',
          500: '#d36763',
          600: '#a85250',
          700: '#7e3e3d',
          800: '#542929',
          900: '#2a1515',
          950: '#150a0a',
        },
        accent: {
          light: '#e9e164',
          DEFAULT: '#d2944c',
          dark: '#d36763',
        },
      },
      fontFamily: {
        display: ['Cormorant', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'section-pattern': 'linear-gradient(to right, rgba(233, 225, 100, 0.05), rgba(210, 148, 76, 0.05))',
      },
      letterSpacing: {
        'tight': '-0.02em',
        'tighter': '-0.04em',
      },
    },
  },
  plugins: [],
};