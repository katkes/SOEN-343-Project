import mongoose, { Schema, Document } from 'mongoose';

export interface ITicket extends Document {
  eventId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  paymentId: string;
  isAttending: boolean;
  purchaseDate: Date;
}

const TicketSchema = new Schema<ITicket>({
  eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  paymentId: { type: String, required: true },
  isAttending: { type: Boolean, default: false },
  purchaseDate: { type: Date, default: Date.now },
});

export const Ticket = mongoose.model<ITicket>('Ticket', TicketSchema);
