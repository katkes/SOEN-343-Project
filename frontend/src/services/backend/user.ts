
import { UserAccount } from '../../types/account';
import { EventResponseDTO } from '../../types/event';
import { api } from './api';
import { Endpoints } from './endpoints';


async function getAllSpeakers() {
  return api.get<UserAccount[]>(Endpoints.User.GetAllSpeakers)
}

async function getUserByEmail(email: string) {
  return api.get<UserAccount>(Endpoints.User.GetUserByEmail.replace(':email', email))
}

async function getEventsRegisteredByUser(id: string) {
  return api.get<EventResponseDTO[]>(Endpoints.User.GetEventsRegisteredByUser.replace(':id', id))
}

// export the functions here in an object
export const userService = {
  getAllSpeakers,
  getUserByEmail,
  getEventsRegisteredByUser
} as const;


