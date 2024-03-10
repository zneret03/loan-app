export const AccordionRight = ({
  action
}: {
  action: () => void
}): JSX.Element => (
  <svg
    onClick={action}
    className='cursor-pointer'
    width='8'
    height='14'
    viewBox='0 0 8 14'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M1.97059 1.00001L7.62744 6.65686L1.97059 12.3137'
      stroke='#333333'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)
