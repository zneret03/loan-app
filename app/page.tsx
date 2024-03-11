'use client'

import { Button, Center } from '@/components'
import Link from 'next/link'

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

const Home = (): JSX.Element => (
  <Center>
    <div className='text-center'>
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
  </Center>
)

export default Home
