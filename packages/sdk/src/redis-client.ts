import redis from 'redis';

export class RedisClient {
  private redisClient: redis.RedisClientType | null = null;
  public isConnected: boolean = false;

  constructor(private readonly url: string) {
    this.redisClient = redis.createClient({ url });
    this.redisClient.on('error', () => {
      this.isConnected = false;
    });
    this.redisClient.on('connect', () => {
      this.isConnected = true;
    });
  }

  async connect(): Promise<void> {
    if (!this.redisClient || this.isConnected) return;
    try {
      await this.redisClient.connect();
      this.isConnected = true;
    } catch {
      this.isConnected = false;
    }
  }

  async disconnect(): Promise<void> {
    if (!this.redisClient || !this.isConnected) return;
    try {
      await this.redisClient.disconnect();
      this.isConnected = false;
    } catch {
      this.isConnected = false;
    }
  }

  async eval(
    script: string,
    keys: string[],
    args: string[]
  ): Promise<string | null> {
    if (!this.redisClient) return null;
    if (!this.isConnected) {
      await this.connect();
    }
    if (!this.isConnected) return null;
    try {
      const result = await this.redisClient.eval(script, {
        keys,
        arguments: args,
      });
      return typeof result === 'string' ? result : null;
    } catch {
      this.isConnected = false;
      return null;
    }
  }
}
