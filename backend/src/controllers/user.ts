import { Request, Response } from 'express';
import { createUser, getUserByEmail } from '../services/mongo/user';
import { Logger } from '../configs/logger';
import { z } from 'zod';
import { StatusCodes } from 'http-status-codes';

// Create user validation schema when receiving request
const createUserBodySchema = z.object({
  firstName: z.string().min(1, 'firstName field is required'), // Ensures name is a non-empty string
  lastName: z.string().min(1, 'lastName field is required'), // Ensures name is a non-empty string
  password: z.string().min(1, 'password field is required'), // Ensures name is a non-empty string
  email: z.string().min(1).email('Invalid email format'), // Ensures email is a valid email address
});

/**
 * Controller creates a new user to the database
 */
export const createUserController = async (req: Request, res: Response) => {
  try {
    const body = createUserBodySchema.parse(req.body);
    const user = await createUser(body);
    res.status(StatusCodes.CREATED).json(user);
  } catch (error) {
    Logger.error('Error creating user: ', req.body);
    Logger.error('Received error: ', error);
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Error occurred while creating a new user.' });
  }
};

// Email schema for validation
const getUserByEmailParamsSchema = z.object({
  email: z.string().min(1).email('Invalid email format'), // Ensures email is a valid email address
});

/**
 * Controller retrieves a single user by email. Should only return one since emails are unique.
 */
export const getUserByEmailController = async (req: Request, res: Response) => {
  // Email checks
  let email: string | undefined;
  try {
    email = getUserByEmailParamsSchema.parse(req.params.email).email;
  } catch (err) {
    Logger.error(err);
    res
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ error: 'Email is missing or does not have a proper format.' });
    return;
  }

  try {
    const user = await getUserByEmail(email);
    res.status(200).json(user);
  } catch (error) {
    Logger.error('Error retrieving users: ');
    Logger.error('Received error: ', error);
    res.status(500).json({ message: 'Error occurred while getting users.' });
  }
};
