'use client'

import { TopNav } from '@/components'
import { inter } from '@/utils'
import { LoanProvider, PersonalInformationProvider } from '@/context'
import { usePathname } from 'next/navigation'
import '@/styles/tailwind.css'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()

  const links = [
    '/terms-and-conditions',
    '/personal-information',
    '/preview-info'
  ]

  const heightFitLinks = links.includes(pathname)

  return (
    <html lang='en'>
      <body className={inter.className}>
        <TopNav />
        <PersonalInformationProvider>
          <LoanProvider>
            <div
              className={`
            ${pathname === '/terms-and-conditions' ? 'bg-dark-tertiary' : 'bg-default'} 
            ${heightFitLinks ? 'h-fit' : 'h-dvh'} 
            laptop:px-0 desktop:px-[3.5rem]`}
            >
              {children}
            </div>
          </LoanProvider>
        </PersonalInformationProvider>
      </body>
    </html>
  )
}
