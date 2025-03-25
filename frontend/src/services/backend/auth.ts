import { Credentials } from '../../types/auth';
// import { NetworkError } from '../../types/error';
import { api } from './api';
import { Endpoints } from './endpoints';


async function login (credentials: Credentials) {
  await api.post<void>(Endpoints.User.Login, credentials)
}

async function logout () {
  await api.post<void>(Endpoints.User.Logout)
}

async function signUp (user: Credentials) {
  await api.post<void>(Endpoints.User.SignUp, user);
}

// export the functions here in an object
export const authService = {
  login,
  logout,
  signUp
} as const;