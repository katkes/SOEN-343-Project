import mongoose, { Schema, Document, Types } from 'mongoose';

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

export interface IUserDocument extends Document, IUser {
  _id: Types.ObjectId;
}

const UserSchema: Schema = new Schema(
  {
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    role: { type: String, required: true },
    company: { type: Schema.Types.ObjectId, ref: 'Company', required: false },
    _id: { type: mongoose.Types.ObjectId, auto: true },
    companyName: { type: String, required: false },
  },
  // create two extra fields named createdAt and updatedAt in case we need it
  { timestamps: true },
);

export const User = mongoose.model<IUserDocument>('User', UserSchema);
