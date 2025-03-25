import { Router } from 'express';
import { TestController } from '../controllers/test';
import userRoute from './user';
import authRoute from './auth';
import companyRoute from './company';
import { SessionMiddleware } from '../middleware/session';
import { StatusCodes } from 'http-status-codes';
const router = Router();

// Allow sessions to be used for requests.
router.use(SessionMiddleware);

// Test route controller
router.get('/', TestController);

// api/users/
router.use('/users', userRoute);

// api/company/
router.use('/company', companyRoute);

// api/auth
router.use('/auth', authRoute);

// Catch all route for api/ group.
router.all('*', (_, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ error: 'Route not found.' });
});

export default router;
