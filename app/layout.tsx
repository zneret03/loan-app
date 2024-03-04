'use client'

import { TopNav } from '@/components'
import { inter } from '@/utils'
import { LoanProvider } from '@/context'
import { usePathname } from 'next/navigation'
import '@/styles/tailwind.css'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const termsAndConditions = pathname === '/terms-and-conditions'

  return (
    <html lang='en'>
      <body className={inter.className}>
        <TopNav />
        <LoanProvider>
          <div
            className={`
            ${termsAndConditions ? 'bg-dark-tertiary' : 'bg-default'} 
            h-1/2
            laptop:px-0 desktop:px-[3.5rem]`}
          >
            {children}
          </div>
        </LoanProvider>
      </body>
    </html>
  )
}
