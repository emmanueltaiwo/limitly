import app from './app.js';
import { envConfig } from './config/env.js';
import { redisClient } from './config/redis.js';
import { registryRedisClient } from './config/registry-redis.js';
import { initPostHog, shutdownPostHog } from './config/posthog.js';

const server = app.listen(envConfig.PORT, async () => {
  try {
    await redisClient.connect();

    if (!redisClient.isConnected && !redisClient.connecting) {
      throw new Error('Redis connection failed');
    }

    console.log('Redis connected');

    await registryRedisClient.connect();
    if (registryRedisClient.isConnected) {
      console.log('Registry Redis connected');
    }

    // Initialize PostHog analytics
    const posthog = initPostHog();
    if (posthog) {
      console.log('PostHog analytics initialized');
    }

    console.log(`Server is running on port ${envConfig.PORT}`);
  } catch (error) {
    console.error('Server startup error', error);
    process.exit(1);
  }
});

process.on('SIGINT', async () => {
  server.close(async () => {
    await redisClient.disconnect();
    await registryRedisClient.disconnect();
    await shutdownPostHog();
    console.log('Server is shutting down');
  });
});

process.on('SIGTERM', async () => {
  server.close(async () => {
    await redisClient.disconnect();
    await registryRedisClient.disconnect();
    await shutdownPostHog();
    console.log('Server is shutting down');
  });
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception', error);
  process.exit(1);
});
