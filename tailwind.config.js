export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'dm-serif': ['"Playfair Display"', 'serif'],
        sans: ['Pretendard', '-apple-system', 'sans-serif'],
      },
      colors: {
        primary: '#1d4ed8',
        'primary-dark': '#1e40af',
        'primary-pale': '#dbeafe',
        text: '#1e293b',
        'text-mid': '#475569',
        'text-light': '#94a3b8',
        bg: '#f8fafc',
        'bg-alt': '#f1f5f9',
        card: '#ffffff',
        border: '#e2e8f0',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
