import { registerAs } from '@nestjs/config';

export const getDatabaseEnvProperties = () => {
  return {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
  };
};

export default registerAs('database', getDatabaseEnvProperties);
