import { ReactNode } from 'react'
import { AccordionLeft } from '..'
import Link from 'next/link'

interface BaseLineTypes {
  title: string
  children: ReactNode
  dividerColor?: string
  styles?: string
  contentStyle?: string
  isCenterTitle?: boolean
  hasBackButton?: boolean
  divider?: boolean
  historyPath?: string
}

export const BaseLine = ({
  title,
  children,
  dividerColor,
  styles,
  isCenterTitle = false,
  divider,
  contentStyle,
  hasBackButton,
  historyPath
}: BaseLineTypes): JSX.Element => (
  <section className={`${styles}`}>
    <section
      className={`grid grid-row-2 gap-y-[2.5rem] 
          divide-y 
          ${dividerColor}
          ${isCenterTitle ? 'text-center' : 'text-left'} px-[3.5rem] pt-[5rem]`}
    >
      <h1 className='text-[2rem] text-dark-primary'>
        {hasBackButton && (
          <Link href={`${historyPath as string}?previous=true`}>
            <div className='flex items-center gap-2 mb-6 cursor-pointer'>
              <AccordionLeft color='stroke-dark-primary' />
              <h2 className='text-sm text-left'>BACK</h2>
            </div>
          </Link>
        )}

        {title}
      </h1>
      <section
        className={`pt-[2.5rem] ${contentStyle} ${divider && 'divide-y divide-divider-slate'}`}
      >
        {children}
      </section>
    </section>
  </section>
)
