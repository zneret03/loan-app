import { Button } from '@/components'

const Home = (): JSX.Element => (
  <main className='grid place-items-center'>
    <div className='mt-60'>
      <h1 className='font-medium text-[2rem] text-dark-primary'>
        Do you have an MG Bank account?{' '}
      </h1>

      <div className='flex justify-center gap-6 mt-16'>
        <Button label='Yes' />
        <Button label='No' />
      </div>
    </div>
  </main>
)

export default Home
