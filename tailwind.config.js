/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          midnight: '#282B4A',
          DEFAULT: '#282B4A',
          light: '#3A3E66',
          dark: '#1C1E34',
          subtle: '#282B4A15'
        },
        cream: {
          warm: '#FFF3E6',
          vanilla: '#EEEBDA',
          DEFAULT: '#FFF3E6',
          dark: '#E7DCce',
          card: '#FCF7F0'
        },
        plum: {
          DEFAULT: '#381932',
          light: '#53264B',
          dark: '#261122',
          subtle: '#38193215'
        },
        priority: {
          high: '#DC2626',
          medium: '#D97706',
          low: '#2563EB'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Lora', 'Merriweather', 'serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -2px rgba(40, 43, 74, 0.05), 0 1px 4px -1px rgba(40, 43, 74, 0.03)',
        'soft': '0 8px 24px -4px rgba(40, 43, 74, 0.07), 0 2px 6px -1px rgba(40, 43, 74, 0.04)',
        'soft-lg': '0 16px 36px -6px rgba(40, 43, 74, 0.1), 0 4px 12px -2px rgba(40, 43, 74, 0.05)',
        'glow-indigo': '0 0 25px rgba(58, 62, 102, 0.45)',
        'glow-plum': '0 0 25px rgba(56, 25, 50, 0.35)',
      }
    },
  },
  plugins: [],
}
