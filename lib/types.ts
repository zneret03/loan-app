export interface MenuOptions {
  label: string | number
  value: string | number
}

export interface InitialInformationStateTypes {
  firstName: string
  lastName: string
  mobileNumber: string
  email: string
  dateOfBirth: string
  idType: string
  imageUrl: string
  isLoading?: boolean
  termsAndConditions?: boolean
}
