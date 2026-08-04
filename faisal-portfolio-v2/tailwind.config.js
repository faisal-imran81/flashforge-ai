/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#080C0A',
        surface: '#0F1512',
        border: '#1A2420',
        emerald: {
          DEFAULT: '#10B981',
          dim: '#059669',
        },
        ink: '#F0FAF6',
        muted: '#6B7F79',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      maxWidth: {
        content: '720px',
        wide: '1100px',
      },
    },
  },
  plugins: [],
}