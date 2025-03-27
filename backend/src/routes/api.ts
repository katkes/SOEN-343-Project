import { Router } from 'express';
import { TestController } from '../controllers/test';
import userRoute from './user';
import authRoute from './auth';
import companyRoute from './company';
import paymentRoute from './payment';
import eventRoute from './event';
import getSpeakerRoute from './getSpeaker';
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

// api/payment
router.use('/payment', paymentRoute);

// api/event
router.use('/event', eventRoute);

//api/getSpeaker
router.use('/getSpeaker', getSpeakerRoute);

// Catch all route for api/ group.
router.all('*', (_, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ error: 'Route not found.' });
});

export default router;
