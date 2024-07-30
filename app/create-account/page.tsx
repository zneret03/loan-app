'use client'

import { Tooltip } from '@chakra-ui/react'
import { Button } from '@/components'
import { useRouter } from 'next/navigation'

const Page = (): JSX.Element => {
  const router = useRouter()

  const previousPage = (): void => {
    router.back()
  }

  return (
    <main className='grid place-items-center'>
      <div className='mt-60'>
        <h1 className='font-medium text-[2rem] text-center text-dark-primary'>
          You can only apply for a loan if you have an MG Bank Account
        </h1>
      </div>

      <div
        className='
mt-16 mb-6 
      '
      >
        <Tooltip
          label='Coming soon.'
          hasArrow
          placement='top'
          background='white'
          color='#29515C'
          p='2'
          mb='2'
        >
          <div>
            <Button
              label='Create an account'
              styles='opacity-50 cursor-auto py-4 px-16 '
            />
          </div>
        </Tooltip>
      </div>
      <span
        className='cursor-pointer text-base text-dark-primary'
        onClick={previousPage}
      >
        Go back
      </span>
    </main>
  )
}
export default Page
