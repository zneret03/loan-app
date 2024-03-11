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
    screens: {
      tablet: '640px',
      laptop: '1024px',
      desktop: '1550px'
    },
    extend: {
      colors: {
        'T&C': '#8E9293',
        banner: '#CDE2E7',
        'dark-primary': '#29515C',
        'dark-secondary': '#BDC2C4',
        'dark-tertiary': '#D7DADC',
        'dark-slate': '#F4F8F9',
        'divider-slate': '#D9E1E3',
        'divider-dark': '#6EA6B6',
        'iris-dark': '#6667F0',
        'iris-slate': '#A5A6F6',
        'calendar-day': '#FB3F4A',
        'calendar-primary': '#333333',
        gray: '#ECF3F5',
        white: '#FFFFFF',
        primary: '#76ADBC',
        'gray.4': '#A3BEC6',
        divider: '#6EA6B6',
        secondary: '#350840',
        default: '#F9F4F4'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
export default config
