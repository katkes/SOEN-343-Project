
import { AccountStore } from '../../stores/accountStore';
import { CompanyResponse, UserResponse } from '../../types/account';
import { CompanySignUpDTO, CredentialsDTO, EventSignUpDTO, UserSignUpDTO } from '../../types/auth';
import { api } from './api';
import { Endpoints } from './endpoints';


function login (credentials: CredentialsDTO) {
  return api.post<void>(Endpoints.Auth.Login, credentials)
}

async function logout () {
  await api.post<void>(Endpoints.Auth.Logout)
  AccountStore.deleteInstance();
}

function userSignUp (user: UserSignUpDTO) {
  return api.post<void>(Endpoints.User.SignUp, user);
}

function companySignUp (user: CompanySignUpDTO) {
  return api.post<void>(Endpoints.Company.SignUp, user);
}

function accountInfo () {
  return api.get<CompanyResponse | UserResponse>(Endpoints.Account.Info);
}

async function createEvent (event: EventSignUpDTO) {
  await api.post<void>(Endpoints.Event.Create, event);
}

// export the functions here in an object
export const authService = {
  accountInfo,
  login,
  logout,
  userSignUp,
  companySignUp,
  createEvent
} as const;