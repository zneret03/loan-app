'use client'

import { useState } from 'react'
import DatePicker from 'react-datepicker'
import { Calendar, AccordionRight, AccordionLeft } from '@/components'
import { inter, poppins } from '@/utils'
import { getMonth } from 'date-fns'
import '@/styles/custom_date_picker.module.css'
import 'react-datepicker/dist/react-datepicker.css'

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

export const CustomDatePicker = (): JSX.Element => {
  const [startDate, setStartDate] = useState(new Date())

  return (
    <main className='flex items-center border border-primary focus:border-dark-primary w-fit rounded-lg px-3 bg-white'>
      <DatePicker
        className={`${poppins.className} placeholder-gray.4 border border-transparent text-primary px-0 rounded text-base focus:border-0 focus:ring-0 bg-white`}
        selected={startDate}
        onChange={(date) => setStartDate(date as Date)}
        placeholderText='Select date'
        showPopperArrow={false}
        renderCustomHeader={({ date, increaseMonth, decreaseMonth }) => (
          <main className='flex items-center justify-between px-2'>
            <span className={`text-2xl font-bold ${inter.className}`}>
              {months[getMonth(date)]}
            </span>
            <section className='flex items-center gap-2'>
              <AccordionLeft action={decreaseMonth} />
              <AccordionRight action={increaseMonth} />
            </section>
          </main>
        )}
        popperContainer={({ children }) => <div className=''>{children}</div>}
      />

      <Calendar />
    </main>
  )
}
