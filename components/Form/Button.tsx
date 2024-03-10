type ButtonTypes = {
  label: string
  styles?: string
  type?: 'button' | 'submit'
  isDisabled?: boolean
  isLoading?: boolean
  action?: () => void
}

export const Button = ({
  label,
  styles,
  action,
  isDisabled,
  type,
  isLoading,
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
    <span className='font-semibold text-base'>
      {isLoading ? 'please wait...' : label}
    </span>
  </button>
)
