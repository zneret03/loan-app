'use client'

import { useState, useRef, useContext, ChangeEvent, useEffect } from 'react'
import { PersonalInformationContext } from '@/context'
import { typesId } from './helpers/constant'
import { inter, poppins } from '@/utils'
import {
  BaseLine,
  InputField,
  CustomDatePicker,
  Select,
  Button,
  Checkbox
} from '@/components'
import {
  InitialInformationStateTypes,
  MenuOptions,
  useValidation,
  useUploadImage
} from '@/lib'
import { checkFileSize, checkFileType, mobileNumberFormat } from '@/helpers'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

const Page = (): JSX.Element => {
  const { state, dispatch } = useContext(PersonalInformationContext)
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [activeSelect, setActiveSelect] = useState<string | undefined>(
    undefined
  )
  const [image, setImage] = useState<File | null>(null)
  const [isOpenSelect, setIsOpenSelect] = useState<boolean>(false)

  const { validate } = useValidation()
  const { uploadImage } = useUploadImage()

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    control,
    reset,
    formState: { errors }
  } = useForm<InitialInformationStateTypes>({
    defaultValues: {
      termsAndConditions: false
    }
  })

  const query = useRouter()

  const isTermsAndCondition = watch('termsAndConditions')

  const watchForm = watch(['firstName', 'lastName', 'mobileNumber', 'email'])

  const fileInputRef = useRef<HTMLInputElement>(null)

  const setActiveOptions = (option: MenuOptions): void => {
    setIsOpenSelect(false)
    setActiveSelect(option.value as string)
  }

  const onUploadAction = (): void => {
    fileInputRef.current?.click()
  }

  const onSubmit = async (
    data: InitialInformationStateTypes
  ): Promise<void> => {
    const formatDate = new Date(`${startDate}`)

    dispatch({ type: 'loading' })

    if (!activeSelect) {
      setError('idType', {
        message: 'required field.'
      })
      return
    }

    if (!image) {
      setError('imageUrl', {
        message: 'required field.'
      })
      return
    }

    if (!startDate) {
      setError('dateOfBirth', {
        message: 'required field.'
      })
      return
    }

    const { getUrl } = await uploadImage(image)

    const config = {
      ...data,
      imageUrl: getUrl,
      idType: activeSelect,
      dateOfBirth: format(formatDate, 'MM/dd/yyyy'),
      isLoading: false,
      rawImage: image,
      termsAndConditions: isTermsAndCondition
    }

    query.push('/preview-info')

    setTimeout(() => {
      dispatch({ type: 'continue', payload: config })
    }, 3000)
  }

  useEffect(() => {
    if (!!state.firstName) {
      reset({
        ...state,
        termsAndConditions: false
      })

      setStartDate(new Date(state.dateOfBirth))
      setActiveSelect(state.idType)
      setImage(state.rawImage as File)
    }
  }, [state, setActiveSelect, setStartDate])

  useEffect(() => {
    if (!!activeSelect || !!image || !!startDate) {
      clearErrors()
    }
  }, [activeSelect, image, startDate, clearErrors])

  const onOpenSelect = (): void => setIsOpenSelect((prevState) => !prevState)

  const selectOptionsFormat: MenuOptions[] = typesId.map((options) => ({
    label: options,
    value: options
  }))

  const filteredOptions = selectOptionsFormat.filter(
    ({ value }) => value !== activeSelect
  )

  const isFormFilled =
    watchForm.findIndex((find) => !find) > -1 ||
    !activeSelect ||
    !image ||
    !startDate

  const isFormEmpty = isFormFilled || state.isLoading || !isTermsAndCondition

  return (
    <div className='w-full max-w-6xl mx-auto bg-dark-slate shadow-sm'>
      <BaseLine
        title='Personal Information'
        styles='bg-dark-slate rounded-lg h-content'
        dividerColor='divide-divider-slate'
        isCenterTitle={true}
        divider={true}
        hasBackButton
        historyPath='/apply-loan'
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
                hasError={!!errors.firstName}
                errorMessage={errors.firstName?.message}
                {...register('firstName', {
                  required: 'required field.'
                })}
              />
              <InputField
                type='text'
                label='LAST NAME'
                placeholder='Your last name'
                hasError={!!errors.lastName}
                errorMessage={errors.lastName?.message}
                {...register('lastName', {
                  required: 'required field.'
                })}
              />
            </section>

            <section className='grid grid-cols-2 gap-8'>
              <InputField
                type='text'
                label='MOBILE NUMBER'
                placeholder='In 09XX-XXX-XXXX format'
                hasError={!!errors.mobileNumber}
                errorMessage={errors.mobileNumber?.message}
                {...register('mobileNumber', {
                  required: 'required field.',
                  validate: (value) =>
                    mobileNumberFormat.test(value as string) ||
                    'mobile number should be in 09XX-XXX-XXXX format.'
                })}
              />
              <InputField
                label='EMAIL ADDRESS'
                placeholder='Your Email address'
                hasError={!!errors.email}
                errorMessage={errors.email?.message}
                {...register('email', {
                  required: 'required field.',
                  validate: (value) => validate(value)
                })}
              />
            </section>
            <section className='grd grid-cols-2'>
              <CustomDatePicker
                label='DATE OF BIRTH'
                currentDate={startDate}
                setCurrentDate={setStartDate}
                hasError={!!errors.dateOfBirth}
                errorMessage={errors.dateOfBirth?.message}
              />
            </section>

            <section className='grid grid-cols-2 gap-8'>
              <div className='relative'>
                <Select
                  styles='-mt-1.5'
                  selectStyles='w-full'
                  isOpen={isOpenSelect}
                  onOpen={onOpenSelect}
                  label='ID TYPE'
                  hasErrors={!!errors.idType}
                  errorMessage={errors.idType?.message}
                  activeSelect={activeSelect as string}
                  setSelectOptions={setActiveOptions}
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
                  <input
                    type='file'
                    ref={fileInputRef}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      const file = event.target?.files

                      if (file) {
                        const isValidExtension = checkFileType(file, [
                          '.jpeg',
                          '.jpg',
                          '.png'
                        ])
                        const isFileSizeValid = checkFileSize(file, 1_000_000) // fileSize limit to 1mb only

                        if (isValidExtension) {
                          setError('imageUrl', {
                            message: 'image format is invalid.'
                          })
                          return
                        }

                        if (isFileSizeValid) {
                          setError('imageUrl', {
                            message: 'maximum of 1mb image only.'
                          })
                        }

                        setImage(file[0] as File)
                      }
                    }}
                    className='hidden'
                  />
                  <span className={`text-gray.4 ${inter.className}`}>
                    {image?.name || 'Upload ID'}
                  </span>
                  <button
                    className='bg-iris-slate border border-iris-dark hover:bg-iris-dark text-sm text-white text-center px-3.5 py-[0.8rem] rounded-lg'
                    onClick={onUploadAction}
                  >
                    Choose
                  </button>
                </div>
                {!!errors.imageUrl && (
                  <span
                    className={`${poppins.className} text-xs text-red-500 mt-2`}
                  >
                    {errors.imageUrl?.message}
                  </span>
                )}
              </aside>
            </section>
          </div>
        </main>

        <div className='pt-12 space-y-6'>
          <Button
            type='button'
            isDisabled={isFormEmpty || state.isLoading}
            isLoading={state.isLoading}
            action={handleSubmit(onSubmit)}
            label='Continue'
            styles='mt-6 w-full py-2'
          />
          <Checkbox
            control={control}
            callback={handleSubmit(onSubmit)}
            isDisabled={isFormFilled}
            name='termsAndConditions'
            fromPath='persona-information'
            tAndCLabel='Terms and Conditions'
            policyLabel='Privacy Policy'
          />
        </div>
      </BaseLine>
    </div>
  )
}
export default Page
