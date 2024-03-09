'use client'

import { useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import { inter } from '@/utils'
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
  <main className='flex items-center justify-between px-6 pt-4 pb-8'>
    <span className='text-2xl font-bold'>{months[getMonth(date)]}</span>
    <section className='flex items-center gap-4'>
      <AccordionLeft action={decreaseMonth} />
      <AccordionRight action={increaseMonth} />
    </section>
  </main>
)

export const CustomDatePicker = ({ label }: CustomDatePicker): JSX.Element => {
  const [startDate, setStartDate] = useState<Date | null>(null)

  return (
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
          selected={startDate}
          locale='en-GB'
          popperPlacement='bottom-start'
          onChange={(date) => setStartDate(date as Date)}
          placeholderText='Select date'
          showPopperArrow={false}
          minDate={new Date()}
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
    </main>
  )
}
