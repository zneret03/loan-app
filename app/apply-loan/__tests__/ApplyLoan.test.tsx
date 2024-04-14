/*
 * @group integration/loan
 */

import { render, screen, waitScreenUpdate } from '@/utils/test-utils'
import Page from '../page'

describe('<ApplyLoan/>', () => {
  beforeEach(async () => {
    render(<Page />)

    await waitScreenUpdate()
  })

  it('Render all necessary components', () => {
    expect(
      screen.getByRole('textbox', { name: /loan amount/i })
    ).toBeInTheDocument()
    expect(screen.getAllByLabelText('menu-dropdown')[0]).toBeInTheDocument()
    expect(screen.getAllByText('Clear')[0]).toBeInTheDocument()
    expect(screen.getAllByText('Calculate')[0]).toBeInTheDocument()
    expect(screen.getAllByText('ESTIMATED AMORTIZATION')[0]).toBeInTheDocument()
    expect(screen.getAllByText('INTEREST RATE')[0]).toBeInTheDocument()
    expect(
      screen.getAllByText('BREAKDOWN OF FEES AND CHARGES')[0]
    ).toBeInTheDocument()
    expect(screen.getAllByText('DISBURSEMENT FEE')[0]).toBeInTheDocument()
    expect(screen.getAllByText('TOTAL')[0]).toBeInTheDocument()
  })
})
