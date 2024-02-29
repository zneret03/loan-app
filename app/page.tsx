'use client'
import { useRouter } from 'next/navigation'

import { Button } from '@/components'

const Home = (): JSX.Element => {
  const router = useRouter()

  const goToCreateAccount = (): void => {
    router.push('/create-account')
  }

  return (
    <main className='grid place-items-center'>
      <div className='mt-60'>
        <h1 className='font-medium text-[2rem] text-dark-primary'>
          Do you have an MG Bank account?{' '}
        </h1>

        <div className='flex justify-center gap-6 mt-16'>
          <Button label='Yes' />
          <Button label='No' action={goToCreateAccount} />
        </div>
      </div>
    </main>
  )
}

export default Home
