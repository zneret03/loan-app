type ButtonTypes = {
  label: string
  styles?: string
  action?: () => void
}

export const Button = ({ label, styles, action }: ButtonTypes): JSX.Element => (
  <button
    className={`border border-2 border-primary bg-transparent hover:bg-primary text-dark-primary hover:text-white rounded-lg py-4 px-16 ${styles}`}
    onClick={action}
  >
    <span className='font-semibold text-base'>{label}</span>
  </button>
)
