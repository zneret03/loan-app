import { ReactNode } from 'react'

interface BaseLineTypes {
  title: string
  children: ReactNode
  contentStyle?: string
}

export const BaseLine = ({
  title,
  children,
  contentStyle
}: BaseLineTypes): JSX.Element => (
  <main className='mt-[5rem]'>
    <aside className='grid grid-row-2 gap-y-[2.5rem] divide-y divide-divider-slate'>
      <h1 className='text-[2rem] text-dark-primary'>{title}</h1>
      <div className={`pt-[2.5rem] ${contentStyle}`}>{children}</div>
    </aside>
  </main>
)
