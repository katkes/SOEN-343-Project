import mongoose, { Schema, Document } from 'mongoose';

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  hashedPassword: string;
}
export interface IUserDocument extends Document, IUser {}

const UserSchema: Schema = new Schema(
  {
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
  },
  // create two extra fields named createdAt and updatedAt in case we need it
  { timestamps: true },
);

export const User = mongoose.model<IUserDocument>('User', UserSchema);
