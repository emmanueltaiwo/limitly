import app from './app';
import { envConfig } from './config/env';
import { redisClient } from './config/redis';

const server = app.listen(envConfig.PORT, async () => {
  try {
    await redisClient.connect();

    if (!redisClient.isConnected && !redisClient.connecting) {
      throw new Error('Redis connection failed');
    }

    console.log('Redis connected');
    console.log(`Server is running on port ${envConfig.PORT}`);
  } catch (error) {
    console.error('Server startup error', error);
    process.exit(1);
  }
});

process.on('SIGINT', async () => {
  server.close(async () => {
    await redisClient.disconnect();
    console.log('Server is shutting down');
  });
});

process.on('SIGTERM', async () => {
  server.close(async () => {
    await redisClient.disconnect();
    console.log('Server is shutting down');
  });
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception', error);
  process.exit(1);
});
