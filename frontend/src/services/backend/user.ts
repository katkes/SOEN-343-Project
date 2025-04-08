
import { UserAccount } from '../../types/account';
import { api } from './api';
import { Endpoints } from './endpoints';


async function getAllSpeakers() {
  return api.get<UserAccount[]>(Endpoints.User.GetAllSpeakers)
}

// export the functions here in an object
export const userService = {
  getAllSpeakers
} as const;


