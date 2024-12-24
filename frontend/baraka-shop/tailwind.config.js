/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        yellow: '#F46325',
        blue: '#07C4F9',
        palegreen: '#86FC6F'
      }
    },
  },
  plugins: [],
}

