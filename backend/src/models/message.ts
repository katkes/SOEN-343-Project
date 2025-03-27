import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage {
  room: string;
  sender: string;
  content: string;
}
export interface IMessageDocument extends Document, IMessage {}

const MessageSchema: Schema = new Schema(
  {
    room: { type: String, required: true },
    sender: { type: String, required: true },
    content: { type: String, required: true },
  },
  // create two extra fields named createdAt and updatedAt in case we need it
  { timestamps: true },
);

export const Message = mongoose.model<IMessageDocument>('Message', MessageSchema);
