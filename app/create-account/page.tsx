'use client'
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

      <Button label='Create an account' styles='mt-16 mb-6 py-4 px-16 ' />
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
