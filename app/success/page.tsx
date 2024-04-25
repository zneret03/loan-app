'use client'

import { useContext } from 'react'
import { PersonalInformationContext } from '@/context'
import { Center } from '@/components'

const PageItems = ({
  label,
  value
}: {
  label: string
  value: string
}): JSX.Element => (
  <div className='flex'>
    <h1 className='flex-1'>{label}</h1>
    <h2 className='flex-1 font-semibold'>{value}</h2>
  </div>
)

const Page = (): JSX.Element => {
  const { state } = useContext(PersonalInformationContext)

  const { referenceNumber, dateToday } = state

  return (
    <Center>
      <main className='space-y-8 text-dark-primary flex flex-col items-center'>
        <section className='text-center space-y-8'>
          <h1 className='text-3xl'>
            Thank you for trusting MG Bank with your loan.
          </h1>
          <p className='w-[40rem] text-lg font-medium'>
            Thank you for your continued patronage. We will process your
            documents as quickly as we can and update you via email.
          </p>
        </section>

        <section className='w-[27rem] rounded-sm rounded-tl-none bg-banner/20 px-4 py-6 space-y-4'>
          <PageItems
            label='Reference Number'
            value={referenceNumber as string}
          />
          <PageItems label='Date' value={dateToday as string} />
        </section>
      </main>
    </Center>
  )
}

export default Page
