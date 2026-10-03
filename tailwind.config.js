/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Plus Jakarta Sans', 'Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        'display': ['Outfit', 'Montserrat', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          dark: '#07132B',
          navy: '#0D224A',
          blue: '#1B365D',
          gold: '#D4A017',
          'gold-hover': '#B8860B',
          'gold-light': '#FEF3C7',
          accent: '#C59B27',
        },
        surface: {
          light: '#F8FAFC',
          card: '#FFFFFF',
          dark: '#0A1832',
        },
        // Backwards compatibility mappings for UI components
        primary: {
          DEFAULT: '#0D224A',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#D4A017',
          foreground: '#07132B',
        },
        muted: {
          DEFAULT: '#F1F5F9',
          foreground: '#64748B',
        },
        accent: {
          DEFAULT: '#D4A017',
          foreground: '#07132B',
        },
        background: '#FFFFFF',
        foreground: '#0F172A',
        border: '#E2E8F0',
        ring: '#D4A017',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
