import { Types } from 'mongoose';

export type SessionAccountType = { _id: Types.ObjectId; accountType: 'company' | 'user' };
