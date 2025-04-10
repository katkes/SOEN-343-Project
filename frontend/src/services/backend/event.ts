
import { EventResponseDTO } from '../../types/event';
import { api } from './api';
import { Endpoints } from './endpoints';


async function getAllEvents () {
  return api.get<EventResponseDTO[]>(Endpoints.Event.GetAll)
}

async function getEventById (id: string) {
  return api.get<EventResponseDTO>(Endpoints.Event.GetById.replace(':id', id))
}

async function updateEvent(id: string, eventData: Partial<EventResponseDTO>) {
  return api.put<void>(Endpoints.Event.UpdateEvent.replace(':id', id), eventData)
}

async function getEventsRegisteredByUser(id: string) {
  return api.get<EventResponseDTO[]>(Endpoints.User.GetEventsRegisteredByUser.replace(':id', id))
}

// export the functions here in an object
export const eventService = {
  getAllEvents,
  getEventById,
  updateEvent
} as const;


