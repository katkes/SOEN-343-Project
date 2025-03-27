export type CredentialsDTO = {
  email: string;
  password: string;
}

export type UserType = 'Sponsor' | 'EventOrganizer' | 'Learner' | 'Speaker' | 'Admin'
export type UserSignUpDTO =  CredentialsDTO & {
  firstName: string
  lastName: string
  role: UserType
}

export type CompanySignUpDTO =  CredentialsDTO & {
  companyName: string
}

export type EventSignUpDTO = {
  name: string
  description: string
  location: string
  locationType: string
  ticketsSold: number
  maxCapacity: number
  startDateAndTime: Date
  timeDurationInMinutes: number
}