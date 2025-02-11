import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  hashedPassword: string;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
  },
  // create two extra fields named createdAt and updatedAt in case we need it
  { timestamps: true },
);

export const User = mongoose.model<IUser>("User", UserSchema);
