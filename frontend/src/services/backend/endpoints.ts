export const Endpoints = {
  Auth: { 
    Login: "/api/auth/login",
    Logout: "/api/auth/logout",
  },
  User: {
    SignUp: "/api/users",
  },
  Company: {
    SignUp: "/api/company"
  }
} as const;