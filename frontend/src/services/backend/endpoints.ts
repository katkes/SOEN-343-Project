export const Endpoints = {
  Auth: { 
    Login: "/api/auth/login",
    Logout: "/api/auth/logout",
  },
  User: {
    SignUp: "/api/users",
    GetAllSpeakers: "/api/users/speakers",
    GetUserByEmail: "/api/users/:email",
  },
  Company: {
    SignUp: "/api/company"
  },
  Account: { 
    Info: "/api/auth/account-info"
  },
  Event: {
    Create: "/api/event",
    GetAll: "/api/event",
    GetById: "/api/event/:id",
    UpdateEvent: "/api/event/:id/updateEvent"
  }
} as const;