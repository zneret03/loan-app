'use client'

import { useState, useRef } from 'react'
import { typesId } from './helpers/constant'
import { MenuOptions } from '@/lib'
import { inter } from '@/utils'
import {
  BaseLine,
  InputField,
  CustomDatePicker,
  Select,
  Button,
  Checkbox
} from '@/components'
import { useForm } from 'react-hook-form'

interface PersonalInformationTypes {}

const Page = (): JSX.Element => {
  const [activeSelect, setActiveSelect] = useState<number | undefined>(
    undefined
  )
  const [isOpenSelect, setIsOpenSelect] = useState<boolean>(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const { control } = useForm()

  const setActiveOptions = (option: number): void => {
    setIsOpenSelect(false)
    setActiveSelect(option)
  }

  const onUploadAction = (): void => {
    fileInputRef.current?.click()
    console.log(fileInputRef.current?.files)
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
        divider={true}
      >
        <main className='mb-14 text-left space-y-14'>
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
              <aside className='-mt-1'>
                <label
                  className={`text-dark-primary text-xs ${inter.className}`}
                >
                  UPLOAD IMAGE
                </label>
                <div className='mt-2 border border-primary bg-white rounded-lg flex items-center justify-between px-4 py-[1.125rem]'>
                  <input type='file' ref={fileInputRef} className='hidden' />
                  <span className={`text-gray.4 ${inter.className}`}>
                    Upload ID
                  </span>
                  <button
                    className='bg-iris-slate border border-iris-dark hover:bg-iris-dark text-sm text-white text-center px-3.5 py-[0.8rem] rounded-lg'
                    onClick={onUploadAction}
                  >
                    Choose
                  </button>
                </div>
              </aside>
            </section>
          </div>
        </main>

        <div className='pt-12 space-y-6'>
          <Button type='button' label='Continue' styles='mt-6 w-full py-2' />
          <Checkbox control={control} name='termsAndCondition' />
        </div>
      </BaseLine>
    </div>
  )
}
export default Page
