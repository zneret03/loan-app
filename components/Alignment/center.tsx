import { ReactNode } from 'react'

interface CenterTypes {
  children: ReactNode
}

export const Center = ({ children }: CenterTypes): JSX.Element => (
  <main className='flex items-center justify-center h-screen -mt-20'>
    {children}
  </main>
)
