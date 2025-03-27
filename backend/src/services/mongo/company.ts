import { Types } from 'mongoose';
import { Company, ICompany } from '../../models/company';
import { hashPassword } from '../../utils/hash';

export type CreateCompanyDTO = Omit<ICompany, 'hashedPassword'> & { password: string };
export async function createCompany(userData: CreateCompanyDTO) {
  const hashedPassword = await hashPassword(userData.password);
  return await Company.create({ ...userData, hashedPassword });
}

export async function getCompanyByEmail(email: string) {
  return await Company.findOne({ email });
}

export async function getCompanyById(_id: string | Types.ObjectId) {
  return await Company.findOne({ _id });
}
