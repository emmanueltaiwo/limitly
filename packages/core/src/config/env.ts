import dotenv from 'dotenv';
dotenv.config();

type NodeEnv = 'development' | 'production' | 'test';

interface EnvConfig {
  PORT: number;
  REDIS_URL: string;
  NODE_ENV: NodeEnv;
}

export const envConfig: EnvConfig = {
  PORT: process.env.PORT ? parseInt(process.env.PORT) : 5000,
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
  NODE_ENV: (process.env.NODE_ENV as NodeEnv) || 'development',
};
