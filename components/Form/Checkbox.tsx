'use client'

import { UseControllerProps, FieldValues, useController } from 'react-hook-form'
import { useRouter } from 'next/navigation'

type CheckBoxTypes<T extends FieldValues> = UseControllerProps<T> & {
  fromPath: string
  isDisabled: boolean
  callback: () => void
  tAndCLabel?: string
}

export const Checkbox = <T extends FieldValues>(
  props: CheckBoxTypes<T>
): JSX.Element => {
  const { control, name, fromPath, isDisabled, callback, tAndCLabel } = props
  const router = useRouter()

  const toTermsAndConditionPage = (): void => {
    callback()
    router.push(`/terms-and-conditions?fromPath=${fromPath}`)
  }

  const {
    field: { ref, ...rest }
  } = useController<T>({ control, name })

  return (
    <div className='flex items-center space-x-2 w-full'>
      <input
        type='checkbox'
        ref={ref}
        {...rest}
        className='w-5 h-5 rounded-sm text-primary focus:ring-gray border border-primary border-2 cursor-pointer'
      />
      <label className='text-base text-dark-primary'>
        I agree to the{' '}
        <span
          onClick={toTermsAndConditionPage}
          className={`underline font-bold ${isDisabled ? 'pointer-events-none' : 'pointer-events-auto cursor-pointer'}`}
        >
          {tAndCLabel}
        </span>
      </label>
    </div>
  )
}
