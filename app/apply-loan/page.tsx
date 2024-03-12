'use client'

import { useState, useContext, useEffect } from 'react'
import { BaseLine, Button, InputField, Select, Checkbox } from '@/components'
import { MenuOptions } from '@/lib'
import { LoanContext } from '@/context'
import { useForm } from 'react-hook-form'
import { selectOptionsData } from './helpers/constants'
import Link from 'next/link'

interface FormTypes {
  loanAmount: number
  loanTerm: number
  termsAndConditions: boolean
}

const Page = (): JSX.Element => {
  const [activeSelect, setActiveSelect] = useState<number | undefined>(
    undefined
  )
  const [isOpenSelect, setIsOpenSelect] = useState<boolean>(false)

  const { state, dispatch } = useContext(LoanContext)

  const { amortization, interestRates, total } = state

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
    watch,
    reset
  } = useForm<FormTypes>({
    defaultValues: {
      termsAndConditions: false
    }
  })

  const isTermsAndCondition = watch('termsAndConditions')
  const amount = watch('loanAmount')

  const onSubmit = (data: FormTypes): void => {
    const { loanAmount } = data

    if (Number(loanAmount) > 2_000_000 || Number(loanAmount) < 20_000) {
      setError('loanAmount', {
        message: 'loan amount should be in 20,000.00 to 2,000,000.00 only.'
      })

      return
    }

    if (!activeSelect) {
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

  const setActiveOptions = (option: MenuOptions): void => {
    setIsOpenSelect(false)
    setActiveSelect(option.value as number)
  }

  const onOpenSelect = (): void => setIsOpenSelect((prevState) => !prevState)

  const resetFields = (): void => {
    dispatch({ type: 'reset' })
    setActiveSelect(undefined)
    reset()
  }

  useEffect(() => {
    if (!!state.loanAmount) {
      reset({
        loanAmount: state.loanAmount,
        termsAndConditions: false
      })

      setActiveSelect(state.loanTerm)
    }
  }, [state, setActiveSelect])

  const isFormFilled = !!amount && !!activeSelect
  const isDisableButton = isFormFilled && isTermsAndCondition

  const selectOptionsFormat: MenuOptions[] = selectOptionsData.map(
    (options) => ({
      label: options,
      value: options
    })
  )

  const filteredOptions = selectOptionsFormat.filter(
    ({ value }) => value !== activeSelect
  )

  return (
    <main className='flex'>
      <BaseLine
        title='Apply for a Loan'
        dividerColor='divide-divider-slate'
        styles='flex-[2.5]'
      >
        <form className='w-1/2 relative' onSubmit={handleSubmit(onSubmit)}>
          <InputField
            type='number'
            label='LOAN AMOUNT'
            hasError={!!errors.loanAmount}
            errorMessage={errors?.loanAmount?.message as string}
            hasSubText={true}
            placeholder='Enter amount'
            {...register('loanAmount', {
              required: 'required field.'
            })}
          />
          <Select
            styles='mt-6'
            selectStyles='w-full'
            isOpen={isOpenSelect}
            onOpen={onOpenSelect}
            label='LOAN TERM'
            activeSelect={activeSelect as number}
            setSelectOptions={setActiveOptions}
            selectOptions={filteredOptions}
            hasErrors={!!errors.loanTerm}
            errorMessage={errors.loanTerm?.message as string}
            placeholder='Select Loan Term'
          />
          <div className='flex align-items gap-4 mt-8'>
            <Button
              label='Clear'
              type='button'
              action={resetFields}
              styles='py-4 px-11'
            />
            <Button type='submit' label='Calculate' styles='py-4 px-11' />
          </div>
        </form>
      </BaseLine>
      <BaseLine
        title='Breakdown'
        dividerColor='divide-divider-dark'
        styles='flex-1 bg-gray shadow-sm h-screen'
      >
        <section className='space-y-10 text-dark-primary'>
          <section className='space-y-6'>
            <label className='text-sm '>ESTIMATED AMORTIZATION</label>
            <h2 className='text-2xl'>
              Php {Number(amortization).toLocaleString('en-US')}
            </h2>
          </section>

          <aside className='divide divide-y divide-divider-dark space-y-6'>
            <div className='space-y-6'>
              <label className='text-sm '>INTEREST RATE</label>
              <h2 className='text-2xl'>{interestRates}%</h2>
            </div>

            <div className='space-y-6 pt-6'>
              <label className='text-sm'>TOTAL</label>
              <h2 className='text-2xl'>
                Php {Number(total).toLocaleString('en-US')}
              </h2>
            </div>
          </aside>

          <section className='space-y-4'>
            <Link href='/personal-information'>
              <Button
                label='Continue'
                isDisabled={!isDisableButton}
                styles='w-full py-2'
              />
            </Link>

            <Checkbox
              control={control}
              callback={handleSubmit(onSubmit)}
              isDisabled={!isFormFilled}
              name='termsAndConditions'
              fromPath='apply-loan'
              tAndCLabel='Terms and Conditions and Privacy Policy'
            />
          </section>
        </section>
      </BaseLine>
    </main>
  )
}

export default Page
