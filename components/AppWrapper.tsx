'use client'

import { ReactNode } from 'react'
import { TopNav, ModalProvider } from '@/components'
import { LoanProvider, PersonalInformationProvider } from '@/context'
import '@/styles/tailwind.css'

export const AppWrapper = ({ children }: { children: ReactNode }) => (
  <PersonalInformationProvider>
    <ModalProvider>
      <LoanProvider>
        <TopNav />
        {children}
      </LoanProvider>
    </ModalProvider>
  </PersonalInformationProvider>
)
