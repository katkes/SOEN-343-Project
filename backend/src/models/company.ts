import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ICompany {
  email: string;
  companyName: string; // to be changed to object id
  hashedPassword: string;
}
export interface ICompanyDocument extends Document, ICompany {
  _id: Types.ObjectId;
}

const CompanySchema: Schema = new Schema(
  {
    companyName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
  },
  // create two extra fields named createdAt and updatedAt in case we need it
  { timestamps: true },
);

export const Company = mongoose.model<ICompanyDocument>('Company', CompanySchema);
