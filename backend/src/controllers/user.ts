import { Request, Response } from 'express';
import { createUser, CreateUserDTO, getUserByEmail } from '../services/mongo/user';
import { Logger } from '../configs/logger';
import { z } from 'zod';
import { StatusCodes } from 'http-status-codes';
import { ENV_VARS } from '../configs/env';
import jwt from 'jsonwebtoken';
import 'express-session';
import { DefaultCookieConfig, JWT_COOKIE_NAME, SESSION_TIMEOUT } from '../configs/constants';
import { userRoles } from '../models/user';
import { getCompanyByEmail } from '../services/mongo/company';
import { SessionAccountType } from '../types/account';
import { User } from '../models/user';
import { Company } from '../models/company';

// Create user validation schema when receiving request
const createUserBodySchema = z.object({
  firstName: z.string().min(1, 'firstName field is required.'), // Ensures name is a non-empty string
  lastName: z.string().min(1, 'lastName field is required.'), // Ensures name is a non-empty string
  password: z.string().min(1, 'password field is required.'), // Ensures name is a non-empty string
  email: z.string().min(1).email('Invalid email format.'), // Ensures email is a valid email address
  companyName: z.string().optional(), // Ensures companyName is optional
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

  res.cookie(JWT_COOKIE_NAME, token, DefaultCookieConfig);

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

export async function updateProfileController(req: Request, res: Response) {
  try {
    // The authenticate middleware should have attached req.account
    const sessionAccount = req.account;
    if (!sessionAccount) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
      Logger.error('Unauthorized request to update profile');
      return;
    }

    // Read the fields sent by the client
    const { firstName, lastName, companyName, description } = req.body;

    if (sessionAccount.accountType === 'user') {
      const updatedUser = await User.findByIdAndUpdate(
        sessionAccount._id,
        { firstName, lastName, description },
        { new: true },
      );
      if (!updatedUser) {
        res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
        return;
      }
      res.status(StatusCodes.OK).json(updatedUser);
    } else if (sessionAccount.accountType === 'company') {
      const updatedCompany = await Company.findByIdAndUpdate(
        sessionAccount._id,
        { companyName, description },
        { new: true },
      );
      if (!updatedCompany) {
        res.status(StatusCodes.NOT_FOUND).json({ message: 'Company not found' });
        return;
      }
      res.status(StatusCodes.OK).json(updatedCompany);
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid account type' });
    }
  } catch (error: unknown) {
    Logger.error('Error updating profile', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error updating profile' });
  }
}
