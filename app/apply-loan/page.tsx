'use client'

import { useState, useContext } from 'react'
import { BaseLine, Button, InputField, Select } from '@/components'
import { MenuOptions } from '@/lib'
import { LoanContext } from '@/context'
import { useForm } from 'react-hook-form'
import { selectOptionsData } from './helpers/constants'

interface FormTypes {
  loanAmount: number
  loanTerm: string
}

const Page = (): JSX.Element => {
  const [activeSelect, setActiveSelect] = useState<string>('Select Loan Term')
  const [isOpenSelect, setIsOpenSelect] = useState<boolean>(false)

  const { state, dispatch } = useContext(LoanContext)

  const { amortization, interestRates, total } = state

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<FormTypes>()

  const onSubmit = (data: FormTypes): void => {
    const { loanAmount } = data

    if (Number(loanAmount) > 2_000_000 || Number(loanAmount) < 20_000) {
      setError('loanAmount', {
        message: 'loan amount should be in 20,000.00 to 2,000,000.00 only.'
      })

      return
    }

    if (activeSelect === 'Select Loan Term') {
      setError('loanTerm', {
        message: 'required field.'
      })

      return
    }

    dispatch({
      type: 'computation',
      payload: { loanAmount, loanTerm: activeSelect }
    })
  }

  const setActiveOptions = (option: string): void => {
    setIsOpenSelect(false)
    setActiveSelect(option)
  }

  const filteredOptions = selectOptionsData.filter(
    ({ label }) => label !== activeSelect
  ) as MenuOptions[]

  const onOpenSelect = (): void => setIsOpenSelect((prevState) => !prevState)

  return (
    <main className='flex'>
      <BaseLine
        title='Apply for a Loan'
        dividerColor='divider-slate'
        styles='flex-[2.5]'
      >
        <form className='w-1/2 relative' onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label='LOAN AMOUNT'
            hasError={!!errors.loanAmount}
            errorMessage={errors?.loanAmount?.message as string}
            {...register('loanAmount', {
              required: 'required field.'
            })}
          />
          <Select
            styles='mt-6'
            isOpen={isOpenSelect}
            onOpen={onOpenSelect}
            label='LOAN TERM'
            activeSelect={activeSelect}
            setSelectOptions={setActiveOptions}
            selectOptions={filteredOptions}
            hasErrors={!!errors.loanTerm}
            errorMessage={errors.loanTerm?.message as string}
          />
          <div className='flex align-items gap-4 mt-24'>
            <Button label='Clear' styles='py-4 px-11' />
            <Button type='submit' label='Calculate' styles='py-4 px-11' />
          </div>
        </form>
      </BaseLine>
      <BaseLine
        title='Breakdown'
        dividerColor='divider-dark'
        styles='flex-1 bg-gray shadow-sm h-screen'
      >
        <section className='space-y-10 text-dark-primary'>
          <div className='space-y-6'>
            <label className='text-sm '>ESTIMATED AMORTIZATION</label>
            <h2 className='text-2xl'>Php {amortization}</h2>
          </div>

          <aside className='divide divide-y divide-divider-dark space-y-6'>
            <div className='space-y-6'>
              <label className='text-sm '>INTEREST RATE</label>
              <h2 className='text-2xl'>{interestRates}</h2>
            </div>

            <div className='space-y-6 pt-6'>
              <label className='text-sm'>TOTAL</label>
              <h2 className='text-2xl'>Php {total}</h2>
            </div>
          </aside>

          <div>
            <Button label='Continue' styles='w-full py-2' />
          </div>
        </section>
      </BaseLine>
    </main>
  )
}

export default Page
