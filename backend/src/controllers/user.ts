import { Request, Response } from 'express';
import { createUser, CreateUserDTO, getUserByEmail } from '../services/mongo/user';
import { Logger } from '../configs/logger';
import { z } from 'zod';
import { StatusCodes } from 'http-status-codes';
import { ENV_VARS } from '../configs/env';
import jwt from 'jsonwebtoken';
import 'express-session';
import { SESSION_TIMEOUT } from '../configs/constants';
import { userRoles } from '../models/user';
import { getCompanyByEmail } from '../services/mongo/company';
import { SessionAccountType } from '../middleware/session';

// Create user validation schema when receiving request
const createUserBodySchema = z.object({
  firstName: z.string().min(1, 'firstName field is required.'), // Ensures name is a non-empty string
  lastName: z.string().min(1, 'lastName field is required.'), // Ensures name is a non-empty string
  password: z.string().min(1, 'password field is required.'), // Ensures name is a non-empty string
  email: z.string().min(1).email('Invalid email format.'), // Ensures email is a valid email address
  role: z.enum(userRoles), // Ensures email is a valid email address
});

/**
 * Controller creates a new user to the database
 */
export async function createUserController(req: Request, res: Response) {
  let body: CreateUserDTO;
  try {
    body = createUserBodySchema.parse(req.body);
    // create user
  } catch (error) {
    Logger.error('Error creating user: ', req.body);
    Logger.error('Received error: ', error);
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Error occurred while creating a new user.' });
    return;
  }

  // make sure the email is not already used by the company
  const company = await getCompanyByEmail(body.email);
  if (company) {
    res.status(StatusCodes.CONFLICT).json({ error: 'Email already exists' });
    return;
  }

  const user = await createUser(body);

  // create token for user and store userId in JWT store
  const account: SessionAccountType = { _id: user._id, accountType: 'user' };
  const token = jwt.sign(account, ENV_VARS.JWT_SECRET, { expiresIn: SESSION_TIMEOUT });
  req.session.token = token;

  // return success status
  res.status(StatusCodes.CREATED).json({});
}

// Email schema for validation
const getUserByEmailParamsSchema = z.object({
  email: z.string().min(1).email('Invalid email format.'), // Ensures email is a valid email address
});

/**
 * Controller retrieves a single user by email. Should only return one since emails are unique.
 */
export async function getUserByEmailController(req: Request, res: Response) {
  // Email checks
  let email: string;
  try {
    email = getUserByEmailParamsSchema.parse(req.params).email;
  } catch (err) {
    Logger.error(err);
    res
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ error: 'Email is missing or does not have a proper format.' });
    return;
  }

  try {
    const user = await getUserByEmail(email);
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    Logger.error('Error retrieving users: ');
    Logger.error('Received error: ', error);
    res.status(500).json({ error: 'Error occurred while getting users.' });
  }
}
