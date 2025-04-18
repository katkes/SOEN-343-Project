import { Request, Response } from 'express';
import { Logger } from '../configs/logger';
import { z } from 'zod';
import { StatusCodes } from 'http-status-codes';
import 'express-session';
import {
  createEvent,
  CreateEventDTO,
  getAllEvents,
  getEventById,
  updateEvent,
} from '../services/mongo/event';
import { getAllEmails } from '../services/mongo/user';
import { EmailService } from '../services/email/email';
import { generateEventPromotionHtml } from '../services/email/email-templates/event-promote';
import { EventDetails } from '../services/email/email-templates/event-promote';
import { getAllTicketsByEventID } from '../services/mongo/ticket';

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
  sponsoredBy: z.string().optional(),
  organizedBy: z.string().optional(),
  price: z.number().min(0, 'Price cannot be negative.'),
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
  const eventDetails: EventDetails = {
    date: body.startDateAndTime,
    speakers: [{ name: body.speaker, title: '' }],
    category: body.locationType,
    title: body.name,
    image: '',
    description: body.description,
    location: body.location,
    price: body.price.toString(),
    registrationUrl: '',
  };
  const html = generateEventPromotionHtml(eventDetails);
  const users = await getAllEmails();
  const result = await new EmailService()
    .createMailBuilder()
    .subject('Check out this new event!')
    .to(users)
    .html(html)
    .send();
  console.log(
    result.success ? 'Emails sent successfully!' : 'Failed to send emails:',
    result.error,
  );
}

export async function updateEventController(req: Request, res: Response) {
  const { id } = req.params; // Get the event ID from the request parameters
  const { sponsoredBy } = req.body;

  try {
    const event = await updateEvent(id, { sponsoredBy });
    if (!event) {
      return res.status(404).send('Event not found');
    }

    res.status(StatusCodes.OK).send(event);
  } catch (error) {
    res.status(500).send('Error updating event: ' + error);
  }
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

export const getTicketsByEventIDController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params; // Extract event ID from request parameters

  try {
    // Fetch tickets associated with the event ID
    const tickets = await getAllTicketsByEventID(id);

    if (!tickets) {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'No tickets found for this event' });
      return;
    }

    res.status(StatusCodes.OK).json(tickets);
  } catch (error) {
    Logger.error('Error retrieving tickets by event ID: ', error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Error occurred while retrieving tickets.' });
  }
};
