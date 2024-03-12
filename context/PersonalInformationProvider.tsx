'use client'

import { PersonalInfoActionTypes } from './helper'
import { InitialInformationStateTypes } from '@/lib'
import { format } from 'date-fns'
import { createContext, Dispatch, ReactNode, useReducer } from 'react'

interface PersonalInformationProviderTypes {
  children: ReactNode
}

const initialInformationState: InitialInformationStateTypes = {
  firstName: '',
  lastName: '',
  mobileNumber: '',
  email: '',
  dateOfBirth: '',
  idType: '',
  imageUrl: '',
  referenceNumber: '',
  isLoading: false,
  rawImage: null
} as const

interface CreateContextTypes {
  state: InitialInformationStateTypes
  dispatch: Dispatch<any>
}

export const PersonalInformationContext = createContext<CreateContextTypes>({
  state: initialInformationState,
  dispatch: () => null
})

const reducer = (
  state: InitialInformationStateTypes,
  action: PersonalInfoActionTypes<InitialInformationStateTypes>
): InitialInformationStateTypes => {
  switch (action.type) {
    case 'continue':
      const today = new Date()
      const referenceNumber = `MG-${Math.floor(Math.random() * 90000) + 10000}`
      const dateToday = format(today, 'MM/dd/yyyy')

      return { ...state, ...action.payload, referenceNumber, dateToday }
    case 'loading':
      return { ...state, isLoading: true }
    default:
      return state
  }
}

export const PersonalInformationProvider = ({
  children
}: PersonalInformationProviderTypes): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialInformationState)
  return (
    <PersonalInformationContext.Provider value={{ state, dispatch }}>
      {children}
    </PersonalInformationContext.Provider>
  )
}
