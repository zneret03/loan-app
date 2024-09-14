import { emailFormat } from '@/helpers'

interface UseValidationTypes {
  validate: (value: string) => boolean | string
}

export const useValidation = (): UseValidationTypes => {
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const validate = (value: string): boolean | string =>
    emailFormat.test(value) || 'email format is not valid.'

  return {
    validate
  }
}
