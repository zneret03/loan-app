import { Dispatch, SetStateAction } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import { inter, poppins } from '@/utils'
import { Calendar, AccordionRight, AccordionLeft } from '@/components'
import { getMonth } from 'date-fns'

import 'react-datepicker/dist/react-datepicker.css'
import { enGB } from 'date-fns/locale'
registerLocale('en-GB', enGB)

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

interface CustomDatePicker {
  label: string
  currentDate: Date | null
  setCurrentDate: Dispatch<SetStateAction<Date | null>>
  hasError?: boolean
  errorMessage?: string
}

interface CustomHeader {
  date: Date
  decreaseMonth: () => void
  increaseMonth: () => void
}

const CustomHeader = ({
  date,
  decreaseMonth,
  increaseMonth
}: CustomHeader): JSX.Element => (
  <main className='flex items-center justify-between px-3 py-2'>
    <span className='text-lg font-bold text-calendar-primary'>
      {months[getMonth(date)]}
    </span>
    <section className='flex items-center gap-6'>
      <AccordionLeft action={decreaseMonth} />
      <AccordionRight action={increaseMonth} />
    </section>
  </main>
)

export const CustomDatePicker = ({
  label,
  currentDate,
  setCurrentDate,
  hasError,
  errorMessage
}: CustomDatePicker): JSX.Element => (
  <main>
    <label
      htmlFor='loan-amount'
      className={`${inter.className} text-dark-primary text-xs`}
    >
      {label}
    </label>
    <section className='flex items-center border border-primary focus:border-dark-primary w-fit rounded-lg px-3 mt-2 bg-white'>
      <DatePicker
        className={`placeholder-gray.4 border w-[29rem] border-transparent text-primary px-0 rounded text-base focus:border-0 focus:ring-0 py-3 bg-white`}
        selected={currentDate}
        locale='en-GB'
        portalId='root-portal'
        popperPlacement='bottom-start'
        onChange={(date) => setCurrentDate(date as Date)}
        placeholderText='Select date'
        showPopperArrow={false}
        renderCustomHeader={({ date, increaseMonth, decreaseMonth }) => (
          <CustomHeader
            date={date}
            increaseMonth={increaseMonth}
            decreaseMonth={decreaseMonth}
          />
        )}
      />

      <Calendar />
    </section>
    {hasError && (
      <span className={`${poppins.className} text-xs text-red-500 mt-2`}>
        {errorMessage}
      </span>
    )}
  </main>
)
