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
        divider: '#6EA6B6',
        'divider-slate': '#D9E1E3',
        secondary: '#350840'
      }
    }
  },
  plugins: []
}
export default config
