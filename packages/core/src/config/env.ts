import dotenv from 'dotenv';
dotenv.config();

type NodeEnv = 'development' | 'production' | 'test';

interface EnvConfig {
  PORT: number;
  REDIS_URL: string;
  REGISTRY_REDIS_URL: string;
  NODE_ENV: NodeEnv;
  POSTHOG_API_KEY: string;
  POSTHOG_HOST: string;
  POSTHOG_ENABLED: boolean;
  ANALYTICS_TOKEN: string;
}

export const envConfig: EnvConfig = {
  PORT: process.env.PORT ? parseInt(process.env.PORT) : 5000,
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
  REGISTRY_REDIS_URL: process.env.REGISTRY_REDIS_URL || process.env.REDIS_URL || 'redis://localhost:6379/1',
  NODE_ENV: (process.env.NODE_ENV as NodeEnv) || 'development',
  POSTHOG_API_KEY: process.env.POSTHOG_API_KEY || '',
  POSTHOG_HOST: process.env.POSTHOG_HOST || 'https://app.posthog.com',
  POSTHOG_ENABLED: process.env.POSTHOG_ENABLED !== 'false' && !!process.env.POSTHOG_API_KEY,
  ANALYTICS_TOKEN: process.env.ANALYTICS_TOKEN || 'limitly-analytics',
};
