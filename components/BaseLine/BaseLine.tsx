import { ReactNode } from 'react'

interface BaseLineTypes {
  title: string
  children: ReactNode
  dividerColor?: string
  styles?: string
  isCenterTitle?: boolean
  divider?: boolean
}

export const BaseLine = ({
  title,
  children,
  dividerColor,
  styles,
  isCenterTitle = false,
  divider
}: BaseLineTypes): JSX.Element => {
  return (
    <main className={`${styles}`}>
      <aside
        className={`grid grid-row-2 gap-y-[2.5rem] 
          divide-y 
          ${dividerColor}
          ${isCenterTitle ? 'text-center' : 'text-left'} px-[3.5rem] py-[5rem]`}
      >
        <h1 className='text-[2rem] text-dark-primary'>{title}</h1>
        <div
          className={`pt-[2.5rem] ${divider && 'divide-y divide-divider-slate'}`}
        >
          {children}
        </div>
      </aside>
    </main>
  )
}
