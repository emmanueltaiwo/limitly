import { PostHog } from 'posthog-node';

export interface PostHogConfig {
  apiKey: string;
  host?: string;
}

export class PostHogClient {
  private client: PostHog | null = null;

  constructor(config: PostHogConfig) {
    try {
      this.client = new PostHog(config.apiKey, {
        host: config.host || 'https://app.posthog.com',
        flushAt: 20,
        flushInterval: 10000,
      });
    } catch (error) {
      console.error('Failed to initialize PostHog:', error);
      this.client = null;
    }
  }

  capture(event: {
    distinctId: string;
    event: string;
    properties?: Record<string, unknown>;
  }): void {
    if (!this.client) return;

    try {
      this.client.capture(event);
    } catch (error) {
      console.error('Failed to capture PostHog event:', error);
    }
  }

  async shutdown(): Promise<void> {
    if (this.client) {
      await this.client.shutdown();
      this.client = null;
    }
  }
}
