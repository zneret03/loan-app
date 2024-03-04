'use client'

import { Button } from '@/components'
import Link from 'next/link'

const Home = (): JSX.Element => {
  const ButtonObj = [
    {
      label: 'Yes',
      path: '/create-account'
    },
    {
      label: 'No',
      path: '/apply-loan'
    }
  ]

  return (
    <main className='grid place-items-center'>
      <div className='mt-60'>
        <h1 className='font-medium text-[2rem] text-dark-primary'>
          Do you have an MG Bank account?{' '}
        </h1>

        <div className='flex justify-center gap-6 mt-16'>
          {ButtonObj.map(({ label, path }) => (
            <Link href={path} key={label}>
              <Button label={label} styles='py-4 px-16' />
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Home
