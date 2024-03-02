import { ReactNode } from 'react'

interface BaseLineTypes {
  title: string
  children: ReactNode
  dividerColor?: string
  styles?: string
}

export const BaseLine = ({
  title,
  children,
  dividerColor,
  styles
}: BaseLineTypes): JSX.Element => {
  return (
    <main className={`${styles}`}>
      <aside
        className={`grid grid-row-2 gap-y-[2.5rem] divide-y divide-${dividerColor} px-[3.5rem] mt-[5rem]`}
      >
        <h1 className='text-[2rem] text-dark-primary'>{title}</h1>
        <div className={`pt-[2.5rem]`}>{children}</div>
      </aside>
    </main>
  )
}
