import { IUser, User } from '../models/user.model';

type CreateUserDTO = Omit<IUser, 'hashedPassword'> & { password: string };
export const createUser = async (userData: CreateUserDTO) => {
  return await User.create(userData);
};

export const getUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};
