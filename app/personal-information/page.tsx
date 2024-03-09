'use client'

import { useState } from 'react'
import { typesId } from './helpers/constant'
import { MenuOptions } from '@/lib'
import { BaseLine, InputField, CustomDatePicker, Select } from '@/components'

const Page = (): JSX.Element => {
  const [activeSelect, setActiveSelect] = useState<number | undefined>(
    undefined
  )
  const [isOpenSelect, setIsOpenSelect] = useState<boolean>(false)

  const setActiveOptions = (option: number): void => {
    setIsOpenSelect(false)
    setActiveSelect(option)
  }

  const onOpenSelect = (): void => setIsOpenSelect((prevState) => !prevState)

  const selectOptionsFormat: MenuOptions[] = typesId.map((options) => ({
    label: options,
    value: options
  }))

  const filteredOptions = selectOptionsFormat.filter(
    ({ value }) => value !== activeSelect
  )

  return (
    <div className='w-full max-w-6xl mx-auto bg-dark-slate shadow-sm'>
      <BaseLine
        title='Personal Information'
        styles='bg-dark-slate rounded-lg h-content'
        dividerColor='divide-divider-slate'
        isCenterTitle={true}
      >
        <main className='my-14 text-left space-y-14'>
          <div
            className='bg-iris-slate w-[22.188rem]  border border-iris-dark text-sm
        text-white text-center px-3.5 py-[0.8rem] rounded-lg'
          >
            Ensure that all required details are filled up
          </div>

          <div className='space-y-6'>
            <section className='grid grid-cols-2 gap-8'>
              <InputField
                type='text'
                label='FIRST NAME'
                placeholder='Your first name'
              />
              <InputField
                type='text'
                label='LAST NAME'
                placeholder='Your last name'
              />
            </section>

            <section className='grid grid-cols-2 gap-8'>
              <InputField
                type='number'
                label='MOBILE NUMBER'
                placeholder='In 09XX-XXX-XXXX format'
              />
              <InputField
                label='EMAIL ADDRESS'
                placeholder='Your Email address'
              />
            </section>
            <section className='grd grid-cols-2'>
              <CustomDatePicker label='DATE OF BIRTH' />
            </section>

            <section className='grid grid-cols-2 gap-8'>
              <div className='relative'>
                <Select
                  styles='-mt-1.5'
                  selectStyles='absolute w-full'
                  isOpen={isOpenSelect}
                  onOpen={onOpenSelect}
                  label='ID TYPE'
                  activeSelect={activeSelect as number}
                  setSelectOptions={setActiveOptions as typeof setActiveOptions}
                  selectOptions={filteredOptions}
                  placeholder='Select an ID type to upload'
                />
              </div>
              <InputField
                label='EMAIL ADDRESS'
                placeholder='Your Email address'
              />
            </section>
          </div>
        </main>
      </BaseLine>
    </div>
  )
}
export default Page
