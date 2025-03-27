export type CredentialsDTO = {
  email: string;
  password: string;
}

export type UserRole = 'Sponsor' | 'EventOrganizer' | 'Learner' | 'Speaker' | 'Admin'

export type UserSignUpDTO =  CredentialsDTO & {
  firstName: string
  lastName: string
  role: UserRole
  companyName?: string
}

export type CompanySignUpDTO =  CredentialsDTO & {
  companyName: string
}