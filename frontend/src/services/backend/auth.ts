import { api } from './api';
import { Endpoints } from './endpoints';

type Login = {
  email: string;
  password: string;
}
async function login (credentials: Login) {
  return api.post<Login>(Endpoints.User.Login, credentials);
  // should reroute to dashboard or feed page after being logged in
}

async function logout () {
  return api.post<void>(Endpoints.User.Login)
  // should reroute to login page after being logged out.
}

async function signUp (user: Login) {
  return api.post<Login>(Endpoints.User.Login, user);
  // should reroute to dashboard or feed page after being logged in
}

// export the functions here in an object
export const authService = {
  login,
  logout,
  signUp
} as const;