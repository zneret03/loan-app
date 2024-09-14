export const Spinner = ({ style }: { style: string }): JSX.Element => (
  <div className='flex flex-row space-x-4'>
    <div
      className={`${style} rounded-full animate-spin
                    border border-2 border-dark-gray border-t-transparent`}
    ></div>
  </div>
)
