import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        gray: '#ECF3F5',
        white: '#FFFFFF',
        primary: '#76ADBC',
        'dark-primary': '#29515C',
        secondary: '#350840'
      }
    }
  },
  plugins: []
}
export default config
