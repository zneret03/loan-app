'use client'

import { calculateLoanPayment, LoanActionTypes } from './helper'
import { Dispatch, ReactNode, createContext, useReducer } from 'react'

interface LoanProviderTypes {
  children: ReactNode
}

interface InitialStateTypes {
  amortization: number
  interestRates: number
  total: number
  loanAmount: number
  loanTerm: number
  loanPurpose: string
  documentaryStampFee: number
  disbursementFee: number
}

interface CreateContextTypes {
  state: InitialStateTypes
  dispatch: Dispatch<any>
}

const initialState: InitialStateTypes = {
  amortization: 0,
  interestRates: 0,
  total: 0,
  loanAmount: 0,
  loanTerm: 0,
  loanPurpose: '',
  documentaryStampFee: 0,
  disbursementFee: 0
} as const

export const LoanContext = createContext<CreateContextTypes>({
  state: initialState,
  dispatch: () => null
})

const reducer = (
  state: InitialStateTypes,
  action: LoanActionTypes
): InitialStateTypes => {
  switch (action.type) {
    case 'computation':
      const { loanAmount: principal, loanTerm } = action.payload

      const monthlyInterest = 0.02
      const documentaryStampFee = principal > 250_000 && 0.075 * principal

      const disbursmentFee = 1500

      const { monthlyPayment, totalPayment } = calculateLoanPayment(
        Number(principal),
        loanTerm,
        monthlyInterest
      )

      const grandTotal =
        Number(totalPayment) +
        Number(disbursmentFee) +
        Number(documentaryStampFee)

      const config = {
        amortization: Number(monthlyPayment.toFixed(2)),
        interestRates: monthlyInterest * 100,
        total: Number(grandTotal.toFixed(2)),
        documentaryStampFee: Number(documentaryStampFee)
      }

      return { ...state, ...action.payload, ...config }
    case 'reset':
      return { ...state, ...initialState }
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
