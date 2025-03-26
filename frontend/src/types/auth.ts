export type CredentialsDTO = {
  email: string;
  password: string;
}

export type UserType = 'Sponsor' | 'EventOrganizer' | 'Learner' | 'Speaker' | 'Admin'
export type UserSignUpDTO =  CredentialsDTO & {
  firstName: string
  lastName: string
  role: UserType
  companyName?: string
}

export type CompanySignUpDTO =  CredentialsDTO & {
  companyName: string
}