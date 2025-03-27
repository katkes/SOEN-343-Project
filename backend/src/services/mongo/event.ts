import { Event, IEvent } from '../../models/event';

export type CreateEventDTO = Omit<IEvent, 'hashedPassword'>;

export async function createEvent(eventData: CreateEventDTO) {
  return await Event.create({ ...eventData });
}

export async function getEventByName(name: string) {
  return await Event.findOne({ name });
}
