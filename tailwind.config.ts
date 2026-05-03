import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem' },
      screens: { '2xl': '1280px' },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1A1A2E',
          foreground: '#FAFAF8',
        },
        secondary: {
          DEFAULT: '#C9A84C',
          foreground: '#1A1A2E',
        },
        accent: {
          DEFAULT: '#E8E8E8',
          foreground: '#1C1C1C',
        },
        background: '#FAFAF8',
        foreground: '#1C1C1C',
        muted: { DEFAULT: '#F1F1EE', foreground: '#5A5A5A' },
        border: '#E2E2DD',
        ring: '#C9A84C',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        quote: ['var(--font-quote)', 'Georgia', 'serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.5rem, 5vw + 1rem, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2rem, 3.5vw + 1rem, 3.25rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'display-md': ['clamp(1.5rem, 2vw + 1rem, 2.25rem)', { lineHeight: '1.2' }],
      },
      maxWidth: {
        prose: '68ch',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        'fade-in': 'fade-in 0.6s ease-out both',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
