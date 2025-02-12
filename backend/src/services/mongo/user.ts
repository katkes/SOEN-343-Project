import { IUser, User } from '../../models/user';
import { hashPassword } from '../../utils/hash';

type CreateUserDTO = Omit<IUser, 'hashedPassword'> & { password: string };
export const createUser = async (userData: CreateUserDTO) => {
  const hashedPassword = await hashPassword(userData.password);
  await User.create({ ...userData, hashedPassword });
};

export const getUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};
