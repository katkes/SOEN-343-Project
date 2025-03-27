
import { CreateEventDTO, EventResponseDTO } from '../../types/event';
import { api } from './api';
import { Endpoints } from './endpoints';


async function getAllEvents () {
  return api.get<CreateEventDTO[]>(Endpoints.Event.GetAll)
}

async function getEventById (id: string) {
  return api.get<EventResponseDTO>(Endpoints.Event.GetById.replace(':id', id))
}

// export the functions here in an object
export const eventService = {
    getAllEvents,
    getEventById
} as const;


