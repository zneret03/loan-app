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

  const bgColor =
    pathname === '/terms-and-conditions'
      ? 'bg-dark-tertiary'
      : pathname === 'apply-loan'
        ? 'bg-secondary'
        : 'bg-gray'

  return (
    <html lang='en'>
      <title>Loan app</title>
      <link rel='icon' href='/favicon.ico' />
      <body className={`${inter.className} ${bgColor}`}>
        <AppWrapper>
          <div>{children}</div>
        </AppWrapper>
      </body>
    </html>
  )
}
