export const calculateLoanPayment = (
  loanAmount: number,
  loanTermMonths: number,
  monthlyInterestRate: number
): { monthlyPayment: number; totalInterest: number; totalPayment: number } => {
  // Calculate monthly payment using loan amortization formula
  const monthlyPayment =
    (loanAmount *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, loanTermMonths)) /
    (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1)

  // Calculate total interest paid
  const totalInterest = monthlyPayment * loanTermMonths - loanAmount

  // Calculate total payment
  const totalPayment = loanAmount + totalInterest

  return { monthlyPayment, totalInterest, totalPayment }
}
