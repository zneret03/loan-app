'use client'

import { ReactNode } from 'react'
import { TopNav } from '@/components'
import { LoanProvider, PersonalInformationProvider } from '@/context'
import '@/styles/tailwind.css'

export const AppWrapper = ({ children }: { children: ReactNode }) => (
  <PersonalInformationProvider>
    <LoanProvider>
      <TopNav />
      {children}
    </LoanProvider>
  </PersonalInformationProvider>
)
