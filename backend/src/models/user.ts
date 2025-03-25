import mongoose, { Schema, Document, Types } from 'mongoose';
import { ICompanyDocument } from './company';

export const userTypes = ['Sponsor', 'EventOrganizer', 'Learner', 'Speaker', 'Admin'] as const;
export type UserType = (typeof userTypes)[number];

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  hashedPassword: string;
  type: UserType;
  company?: Types.ObjectId | ICompanyDocument;
}

export interface IUserDocument extends Document, IUser {}

const UserSchema: Schema = new Schema(
  {
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    type: { type: String, required: true },
    company: { type: Schema.Types.ObjectId, ref: 'Company', required: false },
  },
  // create two extra fields named createdAt and updatedAt in case we need it
  { timestamps: true },
);

export const User = mongoose.model<IUserDocument>('User', UserSchema);
