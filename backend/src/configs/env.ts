import * as dotenv from 'dotenv';
import path from 'path';
// config dotenv such that all imported files can use it
dotenv.config({ path: path.join(__dirname, '../../.env') });

// flag to check if all variables are properly defined
let areEnvsDefinedProperly = true;

/**
 * Function to check if the environment variable was properly set.
 *
 * @param variableName variable name in the .env file
 * @param defaultValue define a default value to accept if variable is not defined
 */
function requiredEnv(variableName: string): string {
  const envVar = process.env[variableName];
  if (!envVar) {
    console.error(
      `${variableName} was not defined in the environment variables. Please make sure to defined it.`,
    );
    areEnvsDefinedProperly = false;
    return '';
  }
  return envVar;
}

// Define environment variables needed here
export const ENV_VARS = {
  DB_CONN_STRING: requiredEnv('DB_CONN_STRING'),
  DB_NAME: requiredEnv('DB_NAME'),
  STRIPE_SECRET_KEY: requiredEnv('STRIPE_SECRET_KEY'),
  PORT: process.env.PORT || 3000,
  IS_PROD: process.env.NODE_ENV !== undefined,
  HTTPS: process.env.HTTPS !== undefined,
  JWT_SECRET: process.env.JWT_SECRET || 'supersecretjwtkey',
  SESSION_SECRET: process.env.JWT_SECRET || 'supersecretkey',
  EMAIL: requiredEnv('EMAIL'),
  APP_PASSWORD: requiredEnv('APP_PASSWORD'),
} as const;

// safeguard to not run the program in case env variables are not properly set
if (!areEnvsDefinedProperly) {
  console.error('Environment variables are not all properly defined');
  process.exit(1);
}
