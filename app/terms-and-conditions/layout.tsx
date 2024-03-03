import type { Metadata } from 'next'
import { TopNav } from '@/components'
import { inter } from '@/utils'
import { LoanProvider } from '@/context'
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
        <LoanProvider>
          <div className='bg-dark-secondary h-fit'>{children}</div>
        </LoanProvider>
      </body>
    </html>
  )
}
