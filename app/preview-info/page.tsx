'use client'

import { useContext } from 'react'
import { PersonalInformationContext, LoanContext } from '@/context'
import { BaseLine, Button } from '@/components'
import Link from 'next/link'
import Image from 'next/image'

type ItemsTypes =
  | {
      type: 'single'
      label: string
      value: number | string
    }
  | {
      type: 'multiple'
      hasImage?: boolean
      firstLabel: string
      secondLabel: string
      firstValue: number | string
      secondValue: number | string
    }

const Items = (props: ItemsTypes): JSX.Element => {
  if (props.type === 'single') {
    return (
      <aside className='space-y-4'>
        <label className='text-xs'>{props.label}</label>
        <h2 className='text-primary'>{props.value}</h2>
      </aside>
    )
  }

  return (
    <aside className='flex'>
      <div className='flex-1 space-y-4'>
        <label className='text-xs'>{props.firstLabel}</label>
        <h2 className='text-primary'>{props.firstValue}</h2>
      </div>

      <div className='flex-1 space-y-4'>
        <label className='text-xs'>{props.secondLabel}</label>
        {props.hasImage ? (
          <Image
            loader={() => props.secondValue as string}
            unoptimized={true}
            src={props.secondValue as string}
            width={0}
            height={0}
            className='rounded-sm w-32 h-20 object-cover'
            alt={props.secondValue as string}
          />
        ) : (
          <h2 className='text-primary'>{props.secondValue}</h2>
        )}
      </div>
    </aside>
  )
}

const Page = (): JSX.Element => {
  const { state: personalDetails } = useContext(PersonalInformationContext)
  const { state: loanDetails } = useContext(LoanContext)

  const { loanAmount, loanTerm, total } = loanDetails
  const {
    firstName,
    lastName,
    mobileNumber,
    email,
    dateOfBirth,
    imageUrl,
    idType
  } = personalDetails

  return (
    <div className='w-full max-w-6xl mx-auto bg-dark-slate text-dark-primary shadow-sm'>
      <BaseLine
        title='Please confirm your details below'
        styles='bg-dark-slate rounded-lg h-content'
        contentStyle='space-y-14'
        dividerColor='divide-divider-slate'
        isCenterTitle={false}
        divider={true}
      >
        <section className='space-y-10'>
          <h1 className='text-lg font-medium'>Loan Terms</h1>

          <Items
            type='single'
            label='LOAN AMOUNT'
            value={`Php ${Number(loanAmount).toLocaleString()}`}
          />
          <Items
            type='multiple'
            hasImage={false}
            firstLabel='LOAN TERM'
            firstValue={`${loanTerm} months`}
            secondLabel='LOAN COMPUTATION'
            secondValue={`Php ${Number(total).toLocaleString()}`}
          />
        </section>

        <section className='space-y-10 pt-14'>
          <h1 className='text-lg font-medium'>Personal Information</h1>

          <Items
            type='multiple'
            hasImage={false}
            firstLabel='FIRST NAME'
            firstValue={firstName || 'empty'}
            secondLabel='LAST NAME'
            secondValue={lastName || 'empty'}
          />

          <Items
            type='multiple'
            hasImage={false}
            firstLabel='MOBILE NUMBER'
            firstValue={mobileNumber || 'empty'}
            secondLabel='EMAIL ADDRESS'
            secondValue={email || 'empty'}
          />

          <Items type='single' label='DATE OF BIRTH' value={dateOfBirth} />

          <Items
            type='multiple'
            hasImage={true}
            firstLabel='ID TYPE'
            firstValue={idType || 'empty'}
            secondLabel='ID IMAGE'
            secondValue={imageUrl || 'empty'}
          />

          <div className='pt-14 space-y-4'>
            <Link href='/success'>
              <Button label='Continue' styles='w-full py-2' />
            </Link>
            <p>
              Check your information carefully before you continue.{' '}
              <strong>
                You will not be able to go back to this step once you get past
                this page
              </strong>
            </p>
          </div>
        </section>
      </BaseLine>
    </div>
  )
}

export default Page
