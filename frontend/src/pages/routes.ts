
export const FrontEndRoutes = {
  Dashboard: '/dashboard',
  Home: '/',
  Login: '/login',
  SignUp: '/signup',
  CompanySignUp: '/signup/company',
  SponsorSignUp: '/signup/sponsor',
  AttendeeSignUp: '/signup/attendee',
  EventOrganizerSignUp: '/signup/eventOrganizer',
  CreateCompanyUser: '/signup/company-user',
  Events: '/events',
  
  Event: {
    base: '/event',
    param: ':id',
    definition: '/event/:id',
  },
  Schedule: '/schedule',
  Analytics: '/analytics',
  Profile: '/profile',
  EditProfile: '/profile/edit',
  EventRegistration: '/event/:id/register',
  EventDetails: '/event/:id/details',
  EventStreaming: '/event/:id/streaming',
  EventConfirmation: '/event/:id/confirmation',
  SponsorConfirmation: '/event/:id/sponsorConfirmation',
} as const;
