'use client'

import { PersonalInfoActionTypes } from './helper'
import { InitialInformationStateTypes } from '@/lib'
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
  isLoading: false
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
      return { ...state, ...action.payload }
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
