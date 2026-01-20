import redis from 'redis';
import { envConfig } from './env.js';

class RegistryRedisClient {
  private redisClient: redis.RedisClientType;
  public isConnected: boolean;
  public connecting: boolean;

  constructor() {
    this.redisClient = redis.createClient({
      url: envConfig.REGISTRY_REDIS_URL,
    });
    this.isConnected = false;
    this.connecting = false;

    this.redisClient.on('error', (err) => {
      console.error('Registry Redis error:', err);
      this.isConnected = false;
    });

    this.redisClient.on('connect', () => {
      this.isConnected = true;
    });
  }

  async connect() {
    if (this.connecting || this.isConnected) return;

    this.connecting = true;
    try {
      await this.redisClient.connect();
      this.isConnected = true;
    } catch (error) {
      console.error('Registry Redis connection error', error);
      this.isConnected = false;
    } finally {
      this.connecting = false;
    }
  }

  async disconnect() {
    if (!this.isConnected) return;
    await this.redisClient.disconnect();
    this.isConnected = false;
  }

  async get(key: string) {
    if (!this.isConnected) await this.connect();
    if (!this.isConnected) return null;
    try {
      return await this.redisClient.get(key);
    } catch (error) {
      console.error('Registry Redis get error:', error);
      this.isConnected = false;
      return null;
    }
  }

  async set(
    key: string,
    value: string,
    options?: { EX?: number; PX?: number }
  ) {
    if (!this.isConnected) await this.connect();
    if (!this.isConnected) return;
    try {
      await this.redisClient.set(key, value, options);
    } catch (error) {
      console.error('Registry Redis set error:', error);
      this.isConnected = false;
    }
  }
}

export const registryRedisClient = new RegistryRedisClient();
