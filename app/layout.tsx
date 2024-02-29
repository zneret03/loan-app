import type { Metadata } from 'next'
import { TopNav } from '@/components'
import { Inter } from 'next/font/google'
import '@/styles/tailwind.css'

const inter = Inter({
  subsets: ['latin'],
  weight: '500',
  style: ['normal']
})

export const metadata: Metadata = {
  title: 'Loan app',
  description: 'Loan Application'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <TopNav />
        <div className='bg-gray h-[calc(100vh-74px)] overflow-hidden'>
          {children}
        </div>
      </body>
    </html>
  )
}
