import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        green: { DEFAULT: '#0D3B2E', 2: '#0F4B39', dark: '#082720' },
        gold: { DEFAULT: '#D4AF37', light: '#E9C76B' },
        cream: '#F8F6F1',
        mint: '#EEF7F2',
        coral: '#FCE8DF',
        ink: '#101827',
        muted: '#667085',
        border: '#E7E1D7',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'serif'],
      },
      boxShadow: {
        soft: '0 12px 40px rgba(13,59,46,0.08)',
        card: '0 24px 70px rgba(13,59,46,0.14)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
      },
    },
  },
  plugins: [],
};
export default config;
