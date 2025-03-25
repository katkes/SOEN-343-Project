
import { CompanySignUpDTO, CredentialsDTO, UserSignUpDTO } from '../../types/auth';
import { api } from './api';
import { Endpoints } from './endpoints';


async function login (credentials: CredentialsDTO) {
  await api.post<void>(Endpoints.Auth.Login, credentials)
}

async function logout () {
  await api.post<void>(Endpoints.Auth.Logout)
}

async function userSignUp (user: UserSignUpDTO) {
  await api.post<void>(Endpoints.User.SignUp, user);
}

async function companySignUp (user: CompanySignUpDTO) {
  await api.post<void>(Endpoints.Company.SignUp, user);
}

// export the functions here in an object
export const authService = {
  login,
  logout,
  userSignUp,
  companySignUp
} as const;