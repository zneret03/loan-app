'use client'

import { useState, useContext, useEffect } from 'react'
import {
  BaseLine,
  Button,
  InputField,
  Select,
  Checkbox,
  TermsAndConditionModal
} from '@/components'
import { MenuOptions } from '@/lib'
import { LoanContext } from '@/context'
import { useForm } from 'react-hook-form'
import { loanPurpose, selectOptionsData } from './helpers/constants'
import Link from 'next/link'

interface FormTypes {
  loanAmount: number
  loanTerm: number
  termsAndConditions: boolean
  loanPurpose: string
}

const Page = (): JSX.Element => {
  const [activeSelect, setActiveSelect] = useState<number | undefined>(
    undefined
  )

  const [activeLoanOption, setActiveLoanOptions] = useState<string>('')
  const [isOpenSelect, setIsOpenSelect] = useState<{
    isOpen: boolean
    status: '' | 'loan-option' | 'loan-term'
  }>({ isOpen: false, status: '' })

  const { state, dispatch } = useContext(LoanContext)

  const {
    amortization,
    interestRates,
    total,
    documentaryStampFee,
    disbursementFee
  } = state

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
    watch,
    reset,
    clearErrors
  } = useForm<FormTypes>({
    defaultValues: {
      termsAndConditions: false
    }
  })

  // const isTermsAndCondition = watch('termsAndConditions')
  const amount = watch('loanAmount')

  const onSubmit = (data: FormTypes): void => {
    const { loanAmount } = data

    if (Number(loanAmount) > 2_000_001 || Number(loanAmount) < 20_000) {
      setError('loanAmount', {
        message: 'loan amount should be in 20,000.00 to 2,000,000.00 only.'
      })

      return
    }

    if (!activeLoanOption) {
      setError('loanPurpose', {
        message: 'required field.'
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
      payload: {
        loanAmount,
        loanTerm: activeSelect,
        loanPurpose: activeLoanOption,
        disbursementFee: 1_500
      }
    })
  }

  const setActiveOptions = (option: MenuOptions): void => {
    setIsOpenSelect({ isOpen: false, status: '' })
    setActiveSelect(option.value as number)
  }

  const setActiveLoan = (option: MenuOptions): void => {
    setIsOpenSelect({ isOpen: false, status: '' })
    setActiveLoanOptions(option.value as string)
  }

  const onOpenSelect = (status: 'loan-term' | 'loan-option'): void =>
    setIsOpenSelect((prevState) => ({
      isOpen: !prevState.isOpen,
      status: status
    }))

  const resetFields = (): void => {
    dispatch({ type: 'reset' })
    setActiveSelect(undefined)
    setActiveLoanOptions('')
    reset({
      loanAmount: 0
    })
    clearErrors()
  }

  useEffect(() => {
    if (!!activeSelect || !!activeLoanOption) {
      clearErrors()
    }
  }, [activeSelect, activeLoanOption])

  const isFormFilled = !!amount && !!activeSelect
  const isDisableButton = isFormFilled

  const selectOptionsFormat: MenuOptions[] = selectOptionsData.map(
    (options) => ({
      label: options.label,
      value: options.value
    })
  )

  const filteredOptions = selectOptionsFormat.filter(
    ({ value }) => value !== activeSelect
  )

  const loanPurposeOptions = loanPurpose.map((option) => ({
    label: option,
    value: option
  }))

  return (
    <>
      <main className='flex bg-gray-secondary'>
        <BaseLine
          title='Apply for a Loan'
          dividerColor='divide-divider-slate'
          styles='flex-[2.5]'
        >
          <form className='w-1/2 relative' onSubmit={handleSubmit(onSubmit)}>
            <div className='grid grid-cols-2 gap-4'>
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
                styles='-mt-2'
                selectStyles='w-full'
                isOpen={
                  isOpenSelect.isOpen && isOpenSelect.status === 'loan-option'
                }
                onOpen={() => onOpenSelect('loan-option')}
                label='LOAN PURPOSE (optional)'
                activeSelect={activeLoanOption}
                setSelectOptions={setActiveLoan}
                selectOptions={loanPurposeOptions as MenuOptions[]}
                hasErrors={!!errors.loanPurpose}
                errorMessage={errors.loanPurpose?.message as string}
                placeholder='Select Loan Purpose'
              />
            </div>
            <Select
              styles='mt-6'
              selectStyles='w-full'
              isOpen={
                isOpenSelect.isOpen && isOpenSelect.status === 'loan-term'
              }
              onOpen={() => onOpenSelect('loan-term')}
              label='LOAN TERM'
              activeSelect={
                !!activeSelect
                  ? `${activeSelect} months`
                  : (activeSelect as number)
              }
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
          styles='flex-1 bg-gray shadow-sm pb-10'
        >
          <section className='space-y-10 text-dark-primary'>
            <section className='space-y-6'>
              <label className='text-sm '>ESTIMATED AMORTIZATION</label>
              <h2 className='text-2xl'>
                Php {Number(amortization).toLocaleString('en-US')}
              </h2>
            </section>

            <aside className='divide divide-y divide-divider-dark space-y-6'>
              <div className='space-y-10'>
                <div className='space-y-4 text-right'>
                  <label className='text-sm '>INTEREST RATE</label>
                  <h2 className='text-2xl'>{interestRates}%</h2>
                </div>

                <section className='space-y-4'>
                  <label className=' text-xs'>
                    BREAKDOWN OF FEES AND CHARGES
                  </label>

                  <aside className='bg-banner/20 p-4 space-y-6'>
                    <div className='space-y-4'>
                      <label className='text-xs'>DISBURSEMENT FEE</label>
                      <h2 className='text-base font-bold'>
                        Php {disbursementFee || 0}
                      </h2>
                    </div>
                    <div className='space-y-4 text-xs'>
                      <div className='flex flex-col gap-1'>
                        <label>DOCUMENTARY STAMP TAX</label>

                        <label className='text-[#3C8BA2]'>
                          (IF PHP 250,000 AND ABOVE)
                        </label>
                      </div>
                      <h2 className='text-base font-bold'>
                        Php {documentaryStampFee.toLocaleString()}
                      </h2>
                    </div>
                  </aside>
                </section>
              </div>

              <div className='space-y-6 pt-6 text-right'>
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
                tAndCLabel='Terms and Conditions'
                policyLabel='Privacy Policy'
              />
            </section>
          </section>
        </BaseLine>
      </main>
      <TermsAndConditionModal
        callback={handleSubmit(onSubmit)}
        path='personal-information'
      />
    </>
  )
}

export default Page
