import { compare, hash } from 'bcrypt-ts';

// Defines the number of salt rounds when hashing.
export const SALT_ROUNDS = 10;

/**
 * Async function that hashes a password. To not use for comparing hashed passwords as it is randomly generated.
 * Use for creating new password hashes
 * @param password password to hash
 * @param salt optional salt defining the number of salt rounds if passed as a number, or a string salt to use.
 */
export const hashPassword = async (password: string, salt: number | string = SALT_ROUNDS) =>
  await hash(password, salt);

/**
 * Use to compare a password with a hash
 */
export const compareHash = async (password: string, hashedPassword: string) =>
  await compare(password, hashedPassword);
