import { BaseLine } from '@/components'
import { poppins } from '@/utils'

const Page = (): JSX.Element => (
  <main>
    <BaseLine title='Apply for a Loan'>
      <input
        type='text'
        className={`${poppins.className} border border-primary rounded-lg text-base text-dark-primary outline-none pl-4 py-3 w-full`}
        placeholder='Enter amount'
      />
    </BaseLine>
  </main>
)

export default Page
