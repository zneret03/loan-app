'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components'

const Home = (): JSX.Element => {
  const router = useRouter()

  const goToCreateAccount = (): void => {
    router.push('/create-account')
  }

  const gotToApplyLoan = (): void => {
    router.push('/apply-loan')
  }

  const ButtonObj = [
    {
      label: 'Yes',
      action: gotToApplyLoan
    },
    {
      label: 'No',
      action: goToCreateAccount
    }
  ]

  return (
    <main className='grid place-items-center'>
      <div className='mt-60'>
        <h1 className='font-medium text-[2rem] text-dark-primary'>
          Do you have an MG Bank account?{' '}
        </h1>

        <div className='flex justify-center gap-6 mt-16'>
          {ButtonObj.map(({ label, action }) => (
            <Button
              label={label}
              action={action}
              key={label}
              styles='py-4 px-16'
            />
          ))}
        </div>
      </div>
    </main>
  )
}

export default Home
