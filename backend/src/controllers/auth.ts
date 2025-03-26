import { Request, Response } from 'express';
import { getUserByEmail } from '../services/mongo/user';
import { Logger } from '../configs/logger';
import { z } from 'zod';
import { StatusCodes } from 'http-status-codes';
import { ENV_VARS } from '../configs/env';
import jwt from 'jsonwebtoken';
import 'express-session';
import { compareHash } from '../utils/hash';
import { SESSION_TIMEOUT } from '../configs/constants';
import { getCompanyByEmail } from '../services/mongo/company';
import { SessionAccountType } from '../middleware/session';

type Account = { _id: unknown; hashedPassword: string };
async function findUserOrCompanyAccountByEmail(
  email: string,
): Promise<[Account | null, 'company' | 'user']> {
  let account: Account | null = await getUserByEmail(email);
  let accountType: 'company' | 'user' = 'user';
  // if user not found, check in company table
  if (!account) {
    account = await getCompanyByEmail(email);
    accountType = 'company';
  }
  return [account, accountType];
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
  const [account, accountType] = await findUserOrCompanyAccountByEmail(email);
  if (!account) {
    Logger.error(`User with email \`${email}\` was not found. Returning 404 response`);
    res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found.' });
    return;
  }

  // check if user has same password
  if (!(await compareHash(password, account.hashedPassword))) {
    Logger.error(`User with email \`${email}\` returned a wrong password. Returning 401 response`);
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Wrong password.' });
    return;
  }
  // password matches create token for account and store accountId in JWT store
  const sessionAccount: SessionAccountType = { _id: account._id, accountType };
  const token = jwt.sign(sessionAccount, ENV_VARS.JWT_SECRET, {
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
