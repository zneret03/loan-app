'use client'

import { Dispatch, ReactNode, createContext, useReducer } from 'react'

interface LoanProviderTypes {
  children: ReactNode
}

interface InitialStateTypes {
  amortization: number
  interestRates: string
  total: number
  loanAmount: number
  loanTerm: string
}

interface CreateContextTypes {
  state: InitialStateTypes
  dispatch: Dispatch<any>
}

interface ActionTypes {
  type: 'computation'
  payload: {
    loanAmount: 0
    loanTerm: string
  }
}

const initialState: InitialStateTypes = {
  amortization: 0,
  interestRates: '0%',
  total: 0,
  loanAmount: 0,
  loanTerm: ''
} as const

export const LoanContext = createContext<CreateContextTypes>({
  state: initialState,
  dispatch: () => null
})

const reducer = (
  state: InitialStateTypes,
  action: ActionTypes
): InitialStateTypes => {
  switch (action.type) {
    case 'computation':
      // const { loanAmount, loanTerm } = action.payload
      //
      // if (loanTerm === 'Monthly Interest Rate') {
      // }
      //
      // if(loanTerm === 'Disbursment Fee') {
      //   return {...state, }
      // }

      return { ...state, ...action.payload }
    default:
      return state
  }
}

export const LoanProvider = ({ children }: LoanProviderTypes): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <LoanContext.Provider value={{ state, dispatch }}>
      {children}
    </LoanContext.Provider>
  )
}
