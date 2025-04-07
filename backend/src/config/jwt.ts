import { configDotenv } from 'dotenv';

configDotenv();

export const JWT_SECERT = process.env.JWT_SECERT || 'default_secret_key';
