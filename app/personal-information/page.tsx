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
  Checkbox,
  TermsAndConditionModal
} from '@/components'
import {
  InitialInformationStateTypes,
  MenuOptions,
  useValidation,
  useUploadImage
} from '@/lib'
import {
  checkFileSize,
  mobileNumberFormat,
  checkFileType,
  numberOnly
} from '@/helpers'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import { useRouter, useSearchParams } from 'next/navigation'

const formatPhoneNumber = (value: string): string => {
  // Remove all non-digit characters
  const cleaned = ('' + value).replace(/\D/g, '')

  // Check if the input is of correct length
  const match = cleaned.match(/^(\d{0,4})(\d{0,3})(\d{0,4})$/)

  if (match) {
    // Reformat and return the phone number
    const formatted = `${match[1]}${match[2] ? '-' : ''}${match[2]}${match[3] ? '-' : ''}${match[3]}`
    return formatted
  }
  return value
}

const validateNumber = (value: string): string | boolean => {
  let message = ''

  return message
}

const Page = (): JSX.Element => {
  const { state, dispatch } = useContext(PersonalInformationContext)
  const [startDate, setStartDate] = useState<Date | null>(new Date())
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
    formState: { errors },
    setValue
  } = useForm<InitialInformationStateTypes>({
    defaultValues: {
      termsAndConditions: false
    }
  })

  const query = useRouter()
  const queryParams = useSearchParams()

  const isTermsAndCondition = watch('termsAndConditions')

  const watchForm = watch(['firstName', 'lastName', 'mobileNumber', 'email'])
  const mobileNumber = watch('mobileNumber')

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

    if (!mobileNumberFormat.test(data.mobileNumber)) {
      setError('mobileNumber', {
        message: 'Mobile number should be in 09XX-XXX-XXXX format.'
      })
    }

    if (!numberOnly.test(data.mobileNumber)) {
      setError('mobileNumber', {
        message: 'Number only.'
      })
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
      reset()
    }, 3000)
  }

  useEffect(() => {
    if (!!state.firstName || queryParams.get('previous') === 'true') {
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

  useEffect(() => {
    const formatNumber = formatPhoneNumber(mobileNumber)

    const delayDebounceFn = setTimeout(() => {
      if (formatNumber) {
        setValue('mobileNumber', formatNumber)
      }
    }, 2000)

    return () => clearTimeout(delayDebounceFn)
  }, [mobileNumber])

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
  const isDisableContinue =
    isFormEmpty || state.isLoading || !isTermsAndCondition

  return (
    <>
      <div className='w-full pb-[5rem] max-w-6xl mx-auto bg-dark-slate shadow-sm'>
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
                    required: 'required field.'
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

                          const isFileSizeValid = checkFileSize(
                            file,
                            10_000_000
                          ) // fileSize limit to 10mb only

                          if (isValidExtension) {
                            setError('imageUrl', {
                              message: 'image format is invalid.'
                            })
                            return
                          }

                          if (isFileSizeValid) {
                            setError('imageUrl', {
                              message: 'The file exceeds 10mb.'
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
              isDisabled={isDisableContinue}
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
              tAndCLabel='Terms and Conditions and'
              policyLabel='Privacy Policy'
            />
          </div>
        </BaseLine>
      </div>
      <TermsAndConditionModal
        callback={handleSubmit(onSubmit)}
        path='preview-info'
      />
    </>
  )
}
export default Page
