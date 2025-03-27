import { Request, Response } from 'express';
import { Logger } from '../configs/logger';
import { z } from 'zod';
import { StatusCodes } from 'http-status-codes';
import { ENV_VARS } from '../configs/env';
import jwt from 'jsonwebtoken';
import 'express-session';
import { SESSION_TIMEOUT } from '../configs/constants';
import { createCompany, CreateCompanyDTO } from '../services/mongo/company';
import { getUserByEmail } from '../services/mongo/user';
import { SessionAccountType } from '../middleware/session';

// Create company validation schema when receiving request
const createCompanyBodySchema = z.object({
  companyName: z.string().min(1, 'firstName field is required.'), // Ensures name is a non-empty string
  email: z.string().min(1).email('Invalid email format.'), // Ensures email is a valid email address
  password: z.string().min(1, 'password field is required.'), // Ensures name is a non-empty string
});

/**
 * Controller creates a new company to the database
 */
export async function createCompanyController(req: Request, res: Response) {
  let body: CreateCompanyDTO;
  try {
    body = createCompanyBodySchema.parse(req.body);
    // create company
  } catch (error) {
    Logger.error('Error creating company: ', req.body);
    Logger.error('Received error: ', error);
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Error occurred while creating a new company.' });
    return;
  }
  const user = await getUserByEmail(body.email);
  if (user) {
    res.status(StatusCodes.CONFLICT).json({ error: 'Email already exists' });
    return;
  }
  const company = await createCompany(body);

  // create token for company and store companyId in JWT store
  const account: SessionAccountType = { _id: company._id, accountType: 'company' };
  const token = jwt.sign(account, ENV_VARS.JWT_SECRET, { expiresIn: SESSION_TIMEOUT });
  req.session.token = token;

  // return success status
  res.status(StatusCodes.CREATED).json({});
}
