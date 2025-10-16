/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        cdColor:'bg-gradient-to-r from-ff8800 to-black',
        gradient: 'bg-gradient-to-r from-[#ff8800] to-gray-800',
        orange: '#ff8800',
        oranged: '#ff6600ff',
        accent: '#f5f5f7',
        gray: {
          100: '#f5f5f7',
          200: '#e5e5ea',
          300: '#d1d1d6',
          400: '#a1a1aa',
          500: '#8e8e93',
        },
      },
      fontFamily: {
        sans: ["Inter", "Helvetica Neue", "Arial", "sans-serif"],
      },
      backgroundImage: theme => ({
        // 🎨 Gradient presets using your colors
        'gradient-orange': `linear-gradient(90deg, ${theme('colors.orange')}, ${theme('colors.gray.300')})`,
        'gradient-accent': `linear-gradient(135deg, ${theme('colors.accent')}, white)`,
      }),
    },
  },
  plugins: [
    // 👇 Optional plugin for hover & focus variants on all colors
    function ({ addVariant }) {
      addVariant('child', '& > *'); // For targeting direct children
    },
  ],
};