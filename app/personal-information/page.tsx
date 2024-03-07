import { BaseLine, InputField, CustomDatePicker } from '@/components'

const Page = (): JSX.Element => (
  <div className='w-full max-w-6xl mx-auto bg-dark-slate shadow-sm'>
    <BaseLine
      title='Personal Information'
      styles='bg-dark-slate rounded-lg h-content'
      dividerColor='divide-divider-slate'
      isCenterTitle={true}
    >
      <main className='my-14 text-left space-y-14'>
        <div
          className='bg-iris-slate w-[22.188rem]  border border-iris-dark text-sm
        text-white text-center px-3.5 py-[0.8rem] rounded-lg'
        >
          Ensure that all required details are filled up
        </div>

        <div className='space-y-6'>
          <section className='grid grid-cols-2 gap-4'>
            <InputField label='FIRST NAME' placeholder='Your first name' />
            <InputField label='LAST NAME' placeholder='Your last name' />
          </section>

          <section className='grid grid-cols-2 gap-4'>
            <InputField
              label='MOBILE NUMBER'
              placeholder='In 09XX-XXX-XXXX format'
            />
            <InputField
              label='EMAIL ADDRESS'
              placeholder='Your Email address'
            />
          </section>
          <section>
            <CustomDatePicker />
          </section>
        </div>
      </main>
    </BaseLine>
  </div>
)
export default Page
