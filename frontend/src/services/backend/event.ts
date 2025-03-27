
import { CreateEventDTO } from '../../types/event';
import { api } from './api';
import { Endpoints } from './endpoints';


async function getAllEvents () {
  return api.get<CreateEventDTO[]>(Endpoints.Event.GetAll)
}

// export the functions here in an object
export const eventService = {
    getAllEvents
} as const;


