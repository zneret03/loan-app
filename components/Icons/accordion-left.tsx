export const AccordionLeft = ({
  action,
  color
}: {
  action?: () => void
  color?: string
}): JSX.Element => (
  <svg
    onClick={action}
    className={`cursor-pointer ${color || 'stroke-[#333333]'}`}
    width='8'
    height='14'
    viewBox='0 0 8 14'
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
  >
    <path
      d='M6.65685 1.00001L1 6.65686L6.65685 12.3137'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)
