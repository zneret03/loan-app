'use client'

import { useContext } from 'react'
import { PersonalInformationContext } from '@/context'

const Page = (): JSX.Element => {
  const { state } = useContext(PersonalInformationContext)

  console.log(state)
  return <div>preview info</div>
}

export default Page
