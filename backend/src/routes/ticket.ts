import { Router } from 'express';
import { Ticket } from '../models/ticket'; // Import the Ticket model

const router = Router();

// GET /api/tickets - Retrieve all tickets
router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.find(); // Optionally populate event/user details
    res.json({ tickets });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
});

export default router;
