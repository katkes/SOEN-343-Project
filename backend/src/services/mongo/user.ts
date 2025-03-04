import { IUser, User } from '../../models/user';
import { hashPassword } from '../../utils/hash';

type CreateUserDTO = Omit<IUser, 'hashedPassword'> & { password: string };
export async function createUser(userData: CreateUserDTO) {
  const hashedPassword = await hashPassword(userData.password);
  return await User.create({ ...userData, hashedPassword });
}

export async function getUserByEmail(email: string) {
  return await User.findOne({ email });
}
