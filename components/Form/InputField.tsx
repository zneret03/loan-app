'use client'

import { forwardRef } from 'react'
import { inter, poppins } from '@/utils'

interface InputFieldTypes {
  label: string
  hasError?: boolean
  errorMessage?: string
  placeholder?: string
  hasSubText?: boolean
  type?: string
}

type Ref = HTMLInputElement

export const InputField = forwardRef<Ref, InputFieldTypes>(
  function InputField(props, ref) {
    const {
      label,
      hasError,
      errorMessage,
      hasSubText = false,
      placeholder,
      type = 'text',
      ...rest
    } = props
    return (
      <div className='flex flex-col text-dark-primary'>
        <label
          htmlFor='loan-amount'
          className={`${inter.className} text-xs mb-2`}
        >
          {label}
        </label>
        <input
          id='loan-amount'
          type={type}
          role='textbox'
          className={`${poppins.className} 
            border ${hasError ? 'border-red-500' : 'border-primary'} 
            focus:border-dark-primary 
            rounded-lg text-base outline-none pl-4 py-3 placeholder-gray.4`}
          placeholder={placeholder}
          ref={ref}
          {...rest}
        />
        {hasSubText && (
          <p className={`${poppins.className} text-xs mt-2`}>
            Amount should be between Php 20,000.00 - Php 2,000,000.00
          </p>
        )}
        {hasError && (
          <span className={`${poppins.className} text-xs text-red-500 mt-2`}>
            {errorMessage}
          </span>
        )}
      </div>
    )
  }
)
