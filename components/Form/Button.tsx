type ButtonTypes = {
  label: string
  styles?: string
  type?: 'button' | 'submit'
  isDisabled?: boolean
  action?: () => void
}

export const Button = ({
  label,
  styles,
  action,
  isDisabled,
  type,
  ...rest
}: ButtonTypes): JSX.Element => (
  <button
    type={type}
    className={`border border-2 border-primary bg-transparent 
      ${isDisabled ? 'bg-transparent text-dark-primary ' : 'hover:bg-primary hover:text-white '} 
      rounded-lg ${isDisabled && 'opacity-50 cursor-not-allowed'} ${styles}`}
    onClick={action}
    disabled={isDisabled}
    {...rest}
  >
    <span className='font-semibold text-base'>{label}</span>
  </button>
)
