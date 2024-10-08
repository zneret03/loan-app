'use client'

import { Button, Center } from '@/components'
import Link from 'next/link'

const ButtonObj = [
  {
    label: 'Yes',
    path: '/apply-loan'
  },
  {
    label: 'No',
    path: '/create-account'
  }
]

const Home = (): JSX.Element => {
  const isApplyLoan =
    typeof window !== 'undefined' &&
    window.history.state?.tree[1]?.children[0] === 'apply-loan'

  return (
    <Center>
      <div className='text-center'>
        <h1 className='font-medium text-[2rem] text-dark-primary'>
          Do you have an MG Bank account?{' '}
        </h1>

        <div className='flex justify-center gap-6 mt-16'>
          {ButtonObj.map(({ label, path }) => (
            <Link
              href={`${path}${isApplyLoan ? '?previous=true' : ''}`}
              key={label}
            >
              <Button label={label} styles='py-4 px-16' />
            </Link>
          ))}
        </div>
      </div>
    </Center>
  )
}

export default Home
