import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'ivory-white': '#FAF9F7',
        'charcoal-black': '#2B2B2B',
        'soft-blush-rose': '#E8C4C4',
        // Secondary Colors
        'sage-green': '#A8B5A2',
        'warm-sand': '#E6DED3',
        'stone-grey': '#7A7A7A',
        // Action & Highlight Colors
        'champagne-gold': '#C9A24D',
        'deep-gold': '#B08C3C',
        'success': '#7E9F7C',
        'error': '#C77D7D',
        // Optional Dark Accent
        'deep-espresso': '#3A2F2F',
      },
      fontFamily: {
        'heading': ['Playfair Display', 'serif'],
        'body': ['Inter', 'Lato', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(43, 43, 43, 0.04), 0 1px 3px rgba(43, 43, 43, 0.06)',
        'soft-lg': '0 8px 24px rgba(43, 43, 43, 0.06), 0 4px 8px rgba(43, 43, 43, 0.04)',
        'romantic': '0 4px 20px rgba(201, 162, 77, 0.12), 0 2px 8px rgba(201, 162, 77, 0.08)',
        'elegant': '0 12px 40px rgba(43, 43, 43, 0.08), 0 4px 12px rgba(43, 43, 43, 0.04)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      transitionTimingFunction: {
        'romantic': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'gentle': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [],
}
export default config

