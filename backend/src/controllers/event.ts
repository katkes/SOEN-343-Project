import { Request, Response } from 'express';
import { Logger } from '../configs/logger';
import { z } from 'zod';
import { StatusCodes } from 'http-status-codes';
import 'express-session';
import { createEvent, CreateEventDTO, getAllEvents, getEventById } from '../services/mongo/event';

// Create event validation schema when receiving request
const createEventBodySchema = z.object({
  name: z.string().min(1, 'Event Name field is required.'),
  location: z.string().min(1, 'Location field is required.'),
  locationType: z.string().min(1, 'Location type field is required.'),
  ticketsSold: z.number().min(0, 'Tickets sold cannot be negative.'),
  maxCapacity: z.number().min(0, 'Max capacity cannot be negative.'),
  startDateAndTime: z
    .string()
    .transform((val) => new Date(val))
    .refine((val) => !isNaN(val.getTime()), {
      message: 'Invalid date format',
    }),
  timeDurationInMinutes: z.number().min(0, 'Time duration must be at least 0 minutes.'),
  description: z.string().min(1, 'Description field is required.'),
  speaker: z.string().min(1, 'Speaker email field is required.'),
});

/**
 * Controller creates a new event to the database
 */
export async function createEventController(req: Request, res: Response) {
  let body: CreateEventDTO;
  try {
    body = createEventBodySchema.parse(req.body);
    // create event
  } catch (error) {
    Logger.error('Error creating event: ', req.body);
    Logger.error('Received error: ', error);
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Error occurred while creating a new event.' });
    return;
  }
  await createEvent(body);

  // create token for event and store eventId in JWT store

  // return success status
  res.status(StatusCodes.CREATED).json({});
}

// Get all events from MongoDB
export async function getAllEventsController(req: Request, res: Response) {
  try {
    const events = await getAllEvents();
    res.status(StatusCodes.OK).json(events);
  } catch (error) {
    Logger.error('Error retrieving events: ', error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Error occurred while retrieving events.' });
  }
}

export const getEventByIdController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const event = await getEventById(id);

    if (!event) {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'Event not found' });
    }

    res.status(StatusCodes.OK).json(event);
  } catch (error) {
    Logger.error('Error retrieving event by ID: ', error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Error occurred while retrieving the event.' });
  }
};
