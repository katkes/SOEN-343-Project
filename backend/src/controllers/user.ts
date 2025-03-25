import { Request, Response } from 'express';
import { createUser, getUserByEmail } from '../services/mongo/user';
import { Logger } from '../configs/logger';
import { z } from 'zod';
import { StatusCodes } from 'http-status-codes';
import { ENV_VARS } from '../configs/env';
import jwt from 'jsonwebtoken';
import 'express-session';
import { compareHash } from '../utils/hash';
import { SESSION_TIMEOUT } from '../configs/constants';
import { userTypes } from '../models/user';

// Create user validation schema when receiving request
const createUserBodySchema = z.object({
  firstName: z.string().min(1, 'firstName field is required.'), // Ensures name is a non-empty string
  lastName: z.string().min(1, 'lastName field is required.'), // Ensures name is a non-empty string
  password: z.string().min(1, 'password field is required.'), // Ensures name is a non-empty string
  email: z.string().min(1).email('Invalid email format.'), // Ensures email is a valid email address
  type: z.enum(userTypes), // Ensures email is a valid email address
});

/**
 * Controller creates a new user to the database
 */
export async function createUserController(req: Request, res: Response) {
  let body;
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
  const user = await createUser(body);

  // create token for user and store userId in JWT store
  const token = jwt.sign({ _id: user._id }, ENV_VARS.JWT_SECRET, { expiresIn: SESSION_TIMEOUT });
  req.session.token = token;

  // return success status
  res.sendStatus(StatusCodes.CREATED);
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

// Login schema for validation
const loginParamsSchema = z.object({
  email: z.string().min(1).email('Invalid email format.'), // Ensures email is a valid email address
  password: z.string().min(1, 'Invalid password format.'),
});

export async function loginController(req: Request, res: Response) {
  let body;
  try {
    body = loginParamsSchema.parse(req.body);
  } catch (error) {
    Logger.error('Error logging in user: ', req.body);
    Logger.error('Received error: ', error);
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Error occurred while logging in a user.' });
    return;
  }
  const { email, password } = body;
  const user = await getUserByEmail(email);

  // check if user is found
  if (!user) {
    Logger.error(`User with email \`${email}\` was not found. Returning 404 response`);
    res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found.' });
    return;
  }

  // check if user has same password
  if (!(await compareHash(password, user.hashedPassword))) {
    Logger.error(`User with email \`${email}\` returned a wrong password. Returning 401 response`);
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Wrong password.' });
    return;
  }
  // password matches create token for user and store userId in JWT store
  const token = jwt.sign({ _id: user._id }, ENV_VARS.JWT_SECRET, {
    expiresIn: SESSION_TIMEOUT,
  });
  req.session.token = token;

  // return success status
  res.sendStatus(StatusCodes.NO_CONTENT);
}

export async function logoutController(req: Request, res: Response) {
  req.session.destroy((err) => {
    if (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Logout failed' });
    }
    res.sendStatus(StatusCodes.NO_CONTENT);
  });
}
