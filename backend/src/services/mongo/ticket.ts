import { Types } from 'mongoose';
import { Ticket } from '../../models/ticket';

// const ticketSchema = new mongoose.Schema({
//   eventId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Event',
//     required: true,
//   },
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   paymentId: {
//     type: String,
//     required: true,
//   },
//   purchaseDate: {
//     type: Date,
//     default: Date.now,
//   },
//   isAttending: {
//     type: Boolean,
//     default: false,
//   },
// });

export async function getTicketsByUserID(userId: Types.ObjectId | string) {
  return await Ticket.find({ userId });
}

export async function getAllTicketsByEventID(eventId: Types.ObjectId | string) {
  return await Ticket.find({ eventId });
}

// export const Ticket = mongoose.model('Ticket', ticketSchema);
