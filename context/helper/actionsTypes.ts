export interface LoanActionTypes {
  type: 'computation' | 'reset'
  payload: {
    loanAmount: 0
    loanTerm: number
  }
}

export interface PersonalInfoActionTypes<FormFields> {
  type: 'continue' | 'loading' | 'error'
  payload: FormFields
}
