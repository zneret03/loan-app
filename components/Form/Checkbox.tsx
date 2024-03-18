'use client'

import { UseControllerProps, FieldValues, useController } from 'react-hook-form'
import { useRouter } from 'next/navigation'

type CheckBoxTypes<T extends FieldValues> = UseControllerProps<T> & {
  fromPath: string
  isDisabled: boolean
  callback: () => void
  tAndCLabel?: string
  policyLabel?: string
}

export const Checkbox = <T extends FieldValues>(
  props: CheckBoxTypes<T>
): JSX.Element => {
  const {
    control,
    name,
    fromPath,
    isDisabled,
    callback,
    tAndCLabel,
    policyLabel
  } = props
  const router = useRouter()

  const toRedirect = (url: string): void => {
    callback()
    router.push(url)
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
        <label
          className={`underline font-bold ${isDisabled ? 'pointer-events-none' : 'pointer-events-auto cursor-pointer'}`}
          onClick={() =>
            toRedirect(`/terms-and-conditions?fromPath=${fromPath}`)
          }
        >
          {tAndCLabel}
        </label>{' '}
        <label
          className={`underline font-bold ${isDisabled ? 'pointer-events-none' : 'pointer-events-auto cursor-pointer'}`}
          onClick={() => toRedirect(`/privacy-policy`)}
        >
          {policyLabel}
        </label>
      </label>
    </div>
  )
}
