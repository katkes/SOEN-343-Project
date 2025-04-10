import { Types } from 'mongoose';
import { Event, IEvent } from '../../models/event';

export type CreateEventDTO = Omit<IEvent, 'hashedPassword'>;

export async function createEvent(eventData: CreateEventDTO) {
  return await Event.create({ ...eventData });
}

export async function getAllEvents() {
  return await Event.find({});
}

export async function getEventById(id: string) {
  return await Event.findById(id);
}

export async function updateEvent(id: string, eventData: Partial<CreateEventDTO>) {
  return await Event.updateOne({ _id: id }, { $set: eventData });
}

export async function getEventsFromEventsID(eventIds: Types.ObjectId[]) {
  return await Event.find({ _id: { $in: eventIds } });
}
