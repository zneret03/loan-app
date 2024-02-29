import type { Metadata } from 'next'
import { TopNav } from '@/components'
import { inter } from '@/utils'
import '@/styles/tailwind.css'

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
        <div className='bg-gray h-[calc(100vh-74px)] px-[56px] overflow-hidden'>
          {children}
        </div>
      </body>
    </html>
  )
}
