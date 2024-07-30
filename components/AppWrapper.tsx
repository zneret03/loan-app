'use client'

import { ReactNode } from 'react'
import { TopNav, ModalProvider } from '@/components'
import { LoanProvider, PersonalInformationProvider } from '@/context'
import { ChakraProvider } from '@chakra-ui/react'
import '@/styles/tailwind.css'

export const AppWrapper = ({ children }: { children: ReactNode }) => (
  <ChakraProvider>
    <PersonalInformationProvider>
      <ModalProvider>
        <LoanProvider>
          <TopNav />
          {children}
        </LoanProvider>
      </ModalProvider>
    </PersonalInformationProvider>
  </ChakraProvider>
)
