import { Request, Response } from 'express';
import { Logger } from '../configs/logger';
import { z } from 'zod';
import { StatusCodes } from 'http-status-codes';
import { ENV_VARS } from '../configs/env';
import jwt from 'jsonwebtoken';
import 'express-session';
import { SESSION_TIMEOUT } from '../configs/constants';
import { createEvent, CreateEventDTO } from '../services/mongo/event';
import mongoose from 'mongoose';

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
  speaker: z
    .string()
    .min(1, 'Speaker field is required.')
    .transform((val) => new mongoose.Types.ObjectId(val)),
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
  const event = await createEvent(body);

  // create token for event and store eventId in JWT store
  const token = jwt.sign({ _id: event._id }, ENV_VARS.JWT_SECRET, { expiresIn: SESSION_TIMEOUT });
  req.session.token = token;

  // return success status
  res.status(StatusCodes.CREATED).json({});
}
