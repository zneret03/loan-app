import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    fontFamily: {
      inter: ['var(--font-inter)'],
      poppins: ['var(--font-poppins)']
    },
    extend: {
      colors: {
        gray: '#ECF3F5',
        white: '#FFFFFF',
        primary: '#76ADBC',
        'dark-primary': '#29515C',
        'gray.4': '#A3BEC6',
        divider: '#6EA6B6',
        'divider-slate': '#D9E1E3',
        'divider-dark': '#6EA6B6',
        secondary: '#350840',
        default: '#F9F4F4'
      }
    }
  },
  plugins: []
}
export default config
