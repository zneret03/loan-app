export const Spinner = (): JSX.Element => (
  <div className='flex flex-row space-x-4'>
    <div
      className='w-4 h-4 rounded-full animate-spin
                    border border-2 border-dark-gray border-t-transparent'
    ></div>
  </div>
)
