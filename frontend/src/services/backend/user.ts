
import { UserAccount } from '../../types/account';
import { api } from './api';
import { Endpoints } from './endpoints';


async function getAllSpeakers() {
  return api.get<UserAccount[]>(Endpoints.User.GetAllSpeakers)
}

async function getUserByEmail(email: string) {
  return api.get<UserAccount>(Endpoints.User.GetUserByEmail.replace(':email', email))
}

// export the functions here in an object
export const userService = {
  getAllSpeakers,
  getUserByEmail

} as const;


