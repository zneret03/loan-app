import { AccordionDown } from '..'
import { poppins } from '@/utils'
import { MenuOptions } from '@/lib'

interface SelectTypes {
  label: string
  onOpen: () => void
  activeSelect: number | string
  isOpen: boolean
  setSelectOptions: (option: MenuOptions) => void
  selectOptions: MenuOptions[]
  placeholder: string
  hasErrors?: boolean
  errorMessage?: string
  styles?: string
  selectStyles?: string
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
  placeholder,
  styles,
  selectStyles
}: SelectTypes): JSX.Element => (
  <main className={`${styles}`}>
    <div className='mb-2'>
      <label htmlFor='loan-term' className='text-xs text-dark-primary'>
        {label}
      </label>
    </div>
    <section className='relative'>
      <div
        id='loan-term'
        className={`border ${hasErrors ? 'border-red-500' : 'border-primary'} py-3 rounded-lg bg-white pt-2 ${isOpen ? 'z-50 absolute' : 'relative'} ${selectStyles}`}
      >
        <div
          className={`flex items-center justify-between cursor-pointer px-4 ${isOpen ? 'mb-6' : 'm-auto'}`}
          onClick={() => onOpen()}
        >
          <span
            className={`${!activeSelect ? 'text-gray.4' : 'text-black'} mt-1 text-base ${poppins.className}`}
          >
            {activeSelect || placeholder}
          </span>
          <AccordionDown />
        </div>

        {isOpen && (
          <div className='flex flex-col'>
            {selectOptions.map((option) => (
              <option
                key={option.label}
                className='cursor-pointer hover:bg-primary/10 py-3 px-4'
                onClick={() => setSelectOptions(option)}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </div>
        )}
      </div>
      {hasErrors && (
        <span className={`${poppins.className} text-xs text-red-500`}>
          {errorMessage}
        </span>
      )}
    </section>
  </main>
)
