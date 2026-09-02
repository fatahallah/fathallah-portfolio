/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F3F4F0',
        ink: '#1B2129',
        'ink-dark': '#12151A',
        'paper-dark': '#ECEAE3',
        gold: '#C98A2C',
        'gold-soft': '#D6A230',
        steel: '#3B6E8F',
        'steel-dark': '#6FA8C7',
        line: '#D9D7CE',
        'line-dark': '#2A2E35',
        surface: '#FFFFFF',
        'surface-dark': '#171A20',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"IBM Plex Sans"', '"IBM Plex Sans Arabic"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
