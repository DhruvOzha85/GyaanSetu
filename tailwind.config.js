/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F97316', // Saffron Orange
          hover: '#EA6C0A',
        },
        secondary: {
          DEFAULT: '#0D9488', // Teal Green
          hover: '#0F766E',
        },
        accent: '#F59E0B', // Amber Yellow
        error: '#EF4444', // Coral Red
        success: '#10B981', // Emerald Green
        background: {
          primary: '#FFFFFF',
          secondary: '#F9FAFB',
          card: '#F3F4F6',
        },
        text: {
          heading: '#111827',
          body: '#374151',
          placeholder: '#9CA3AF',
          light: '#6B7280',
        },
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        body: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      borderRadius: {
        button: '8px',
        card: '12px',
        modal: '16px',
        pill: '9999px',
        input: '8px',
      },
      boxShadow: {
        sm: '0px 1px 3px rgba(0, 0, 0, 0.08)',
        md: '0px 4px 16px rgba(0, 0, 0, 0.10)',
        lg: '0px 8px 32px rgba(0, 0, 0, 0.14)',
        xl: '0px 16px 48px rgba(0, 0, 0, 0.18)',
      },
    },
  },
  plugins: [],
};
