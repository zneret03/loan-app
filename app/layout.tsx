'use client'

import { inter } from '@/utils'
import { AppWrapper } from '@/components'
import { usePathname } from 'next/navigation'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()

  return (
    <html lang='en'>
      <title>Loan app</title>
      <link rel='icon' href='/favicon.ico' />
      <body
        className={`${inter.className} ${pathname === '/terms-and-conditions' ? 'bg-dark-tertiary' : 'bg-default'}`}
      >
        <AppWrapper>
          <div className='px-[3.5rem]'>{children}</div>
        </AppWrapper>
      </body>
    </html>
  )
}
