import mongoose, { Schema, Document } from 'mongoose';

export const userRoles = ['Sponsor', 'EventOrganizer', 'Learner', 'Speaker', 'Admin'] as const;
export type UserRole = (typeof userRoles)[number];

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  hashedPassword: string;
  role: UserRole;
  companyName?: string;
}

export interface IUserDocument extends Document, IUser {}

const UserSchema: Schema = new Schema(
  {
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    role: { type: String, required: true },
    companyName: { type: String, required: false },
  },
  // create two extra fields named createdAt and updatedAt in case we need it
  { timestamps: true },
);

export const User = mongoose.model<IUserDocument>('User', UserSchema);
