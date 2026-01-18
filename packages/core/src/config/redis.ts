import redis from 'redis';
import { envConfig } from './env.js';

class RedisClient {
  private redisClient: redis.RedisClientType;
  public isConnected: boolean;
  public connecting: boolean;
  private reconnectAttempts: number;
  private maxReconnectAttempts: number;

  constructor() {
    this.redisClient = redis.createClient({
      url: envConfig.REDIS_URL,
    });
    this.isConnected = false;
    this.connecting = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;

    this.redisClient.on('error', (err) => {
      console.error('Redis error:', err);
      this.isConnected = false;
    });

    this.redisClient.on('connect', () => {
      this.isConnected = true;
      this.reconnectAttempts = 0;
    });
  }

  async connect() {
    if (this.connecting) return;

    this.connecting = true;
    try {
      await this.redisClient.connect();
      this.isConnected = true;
      this.reconnectAttempts = 0;
    } catch (error) {
      console.error('Redis connection error', error);

      this.isConnected = false;
      this.reconnectAttempts++;

      console.log(
        `Redis connection failed, reconnecting attempt ${this.reconnectAttempts} of ${this.maxReconnectAttempts}`
      );

      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        await this.connect();
      } else {
        console.error('Redis connection failed after max reconnect attempts');
        this.connecting = false;
        return;
      }
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
      console.error('Redis get error:', error);
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
      console.error('Redis set error:', error);
      this.isConnected = false;
    }
  }

  async del(key: string) {
    if (!this.isConnected) await this.connect();
    if (!this.isConnected) return;
    await this.redisClient.del(key);
  }

  async eval(script: string, keys: string[], args: string[]) {
    if (!this.isConnected) await this.connect();
    if (!this.isConnected) throw new Error('Redis not connected');
    try {
      return await this.redisClient.eval(script, {
        keys,
        arguments: args,
      });
    } catch (error) {
      console.error('Redis eval error:', error);
      this.isConnected = false;
      throw error;
    }
  }
}

export const redisClient = new RedisClient();
