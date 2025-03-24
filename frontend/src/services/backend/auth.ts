import { Credentials } from '../../types/auth';
// import { NetworkError } from '../../types/error';
import { api } from './api';
import { Endpoints } from './endpoints';


async function login (credentials: Credentials) {
  try {
    await api.post<void>(Endpoints.User.Login, credentials)
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

async function logout () {
  return api.post<void>(Endpoints.User.Login)
}

async function signUp (user: Credentials) {
  try {
    await api.post<void>(Endpoints.User.Login, user);
    return true
  } catch {
    return false
  }
}

// export the functions here in an object
export const authService = {
  login,
  logout,
  signUp
} as const;