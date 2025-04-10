import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IEvent {
  name: string;
  location: string;
  locationType: string;
  ticketsSold: number;
  maxCapacity: number;
  startDateAndTime: Date;
  timeDurationInMinutes: number;
  description: string;
  speaker: string;
  sponsoredBy?: string | undefined; // Optional field
  price: number;
}
export interface IEventDocument extends Document, IEvent {
  _id: Types.ObjectId;
}

const EventSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    locationType: { type: String, required: true },
    ticketsSold: { type: Number, required: true },
    maxCapacity: { type: Number, required: true },
    startDateAndTime: { type: Date, required: true },
    timeDurationInMinutes: { type: Number, required: true },
    description: { type: String, required: true },
    speaker: { type: String, required: true },
    price: { type: Number, required: true },
    sponsoredBy: { type: String, required: false },
  },
  // create two extra fields named createdAt and updatedAt in case we need it
  { timestamps: true },
);

export const Event = mongoose.model<IEventDocument>('Event', EventSchema);
