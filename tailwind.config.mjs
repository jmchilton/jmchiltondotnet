/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: '#ffffff',
          'bg-alt': '#f8f9fa',
          'bg-hover': '#f1f3f5',
          text: '#1a1a1a',
          'text-secondary': '#495057',
          'text-muted': '#868e96',
          border: '#dee2e6',
          'border-dark': '#adb5bd',
          blue: '#0066cc',
          'blue-light': '#e6f2ff',
          green: '#2da44e',
          'green-light': '#e6f9ec',
          purple: '#8250df',
          'purple-light': '#f3f0ff',
          red: '#cf222e',
          'red-light': '#ffebe9',
          yellow: '#bf8700',
          'yellow-light': '#fff8c5',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        'terminal-sm': ['0.875rem', { lineHeight: '1.5' }],
        terminal: ['1rem', { lineHeight: '1.5' }],
        'terminal-lg': ['1.125rem', { lineHeight: '1.5' }],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
