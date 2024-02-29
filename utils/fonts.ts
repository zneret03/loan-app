import { Inter, Poppins } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: '500',
  style: ['normal'],
  variable: '--font-inter'
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: '400',
  style: ['normal']
})

export { inter, poppins }
