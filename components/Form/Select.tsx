import { AccordionDown } from '..'
import { poppins } from '@/utils'
import { MenuOptions } from '@/lib'

interface SelectTypes {
  label: string
  onOpen: () => void
  activeSelect: string
  isOpen: boolean
  setSelectOptions: (select: string) => void
  selectOptions: MenuOptions[]
  hasErrors: boolean
  errorMessage: string
  styles?: string
}

export const Select = ({
  label,
  onOpen,
  isOpen,
  activeSelect,
  setSelectOptions,
  selectOptions,
  hasErrors,
  errorMessage,
  styles
}: SelectTypes): JSX.Element => (
  <main className={`${styles} text-dark-primary`}>
    <div className='mb-2'>
      <label htmlFor='loan-term' className='text-xs'>
        {label}
      </label>
    </div>
    <div
      id='loan-term'
      className='border border-primary px-4 py-3 rounded-lg bg-white pt-2 absolute w-full'
    >
      <div
        className={`flex items-center justify-between cursor-pointer ${isOpen ? 'mb-6' : 'm-auto'}`}
        onClick={() => onOpen()}
      >
        <span
          className={`${activeSelect !== 'Select Loan Term' ? 'text-black' : 'text-gray.4'} mt-1 text-base ${poppins.className}`}
        >
          {activeSelect}
        </span>
        <AccordionDown />
      </div>

      {isOpen && (
        <div className='flex flex-col gap-y-6'>
          {selectOptions.map(({ label, value }) => (
            <option
              key={label}
              className='cursor-pointer'
              onClick={() => setSelectOptions(label)}
              value={value}
            >
              {label}
            </option>
          ))}
        </div>
      )}
    </div>
    {!!hasErrors && (
      <span className={`${poppins.className} text-xs text-red-500 mt-2`}>
        {errorMessage}
      </span>
    )}
  </main>
)
