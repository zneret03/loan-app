'use client'

import { UseControllerProps, FieldValues, useController } from 'react-hook-form'
import Link from 'next/link'

type CheckBoxTypes<T extends FieldValues> = UseControllerProps<T> & {
  fromPath: string
}

export const Checkbox = <T extends FieldValues>(
  props: CheckBoxTypes<T>
): JSX.Element => {
  const { control, name, fromPath } = props

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
        <Link
          href={{
            pathname: '/terms-and-conditions',
            query: { fromPath }
          }}
          className='underline font-bold'
        >
          Terms and Conditions
        </Link>
      </label>
    </div>
  )
}
