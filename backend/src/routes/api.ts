// Route: backend/src/routes/api.ts

import { Router } from 'express';
import { TestController } from '../controllers/test';
import userRoute from './user';
import authRoute from './auth';
import companyRoute from './company';
import paymentRoute from './payment';
import eventRoute from './event';
import { StatusCodes } from 'http-status-codes';
import cookieParser from 'cookie-parser';
import sessionRoutes from './sessions';
import ticketRoute from './ticket';
const router = Router();

// Allow sessions to be used for requests.
router.use(cookieParser());
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

router.use('/sessions', sessionRoutes);

router.use('/tickets', ticketRoute);

// Catch all route for api/ group.
router.all('*', (_, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ error: 'Route not found.' });
});

export default router;
