import crypto from 'crypto';

const ANALYTICS_TOKEN = 'limitly-analytics';
const SDK_VERSION = '1.3.0';

interface AnalyticsEvent {
  event: string;
  distinct_id: string;
  properties: Record<string, unknown>;
}

function hashIdentifier(value: string): string {
  return crypto.createHash('sha256').update(value).digest('hex').substring(0, 16);
}

export class Analytics {
  private readonly baseUrl: string;
  private readonly enabled: boolean;
  private eventQueue: AnalyticsEvent[] = [];
  private flushTimer: NodeJS.Timeout | null = null;
  private readonly flushInterval = 5000;
  private readonly batchSize = 10;

  constructor(baseUrl: string, enabled: boolean = true) {
    this.baseUrl = baseUrl;
    this.enabled = enabled;
  }

  trackRateLimitCheck(
    serviceId: string,
    clientId: string,
    allowed: boolean,
    remaining: number,
    limit: number,
    reset: number,
    hasCustomConfig: boolean,
    customCapacity?: number,
    customRefillRate?: number
  ): void {
    if (!this.enabled) return;

    const serviceIdHash = hashIdentifier(serviceId);
    const clientIdHash = hashIdentifier(clientId);
    const distinctId = `${serviceIdHash}:${clientIdHash}`;

    const properties: Record<string, unknown> = {
      service_id_hash: serviceIdHash,
      client_id_hash: clientIdHash,
      allowed,
      remaining,
      limit,
      reset,
      has_custom_config: hasCustomConfig,
      sdk_version: SDK_VERSION,
    };

    if (customCapacity !== undefined) {
      properties.custom_capacity = customCapacity;
    }
    if (customRefillRate !== undefined) {
      properties.custom_refill_rate = customRefillRate;
    }

    this.eventQueue.push({
      event: 'rate_limit_check',
      distinct_id: distinctId,
      properties,
    });

    this.eventQueue.push({
      event: allowed ? 'rate_limit_allowed' : 'rate_limit_denied',
      distinct_id: distinctId,
      properties: {
        service_id_hash: serviceIdHash,
        client_id_hash: clientIdHash,
        remaining,
        limit,
        reset,
        has_custom_config: hasCustomConfig,
        sdk_version: SDK_VERSION,
      },
    });

    if (this.eventQueue.length >= this.batchSize) {
      this.flush();
    } else if (!this.flushTimer) {
      this.flushTimer = setTimeout(() => this.flush(), this.flushInterval);
    }
  }

  private async flush(): Promise<void> {
    if (this.flushTimer) {
      clearTimeout(this.flushTimer);
      this.flushTimer = null;
    }

    if (this.eventQueue.length === 0) return;

    const events = [...this.eventQueue];
    this.eventQueue = [];

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      await fetch(`${this.baseUrl}/api/analytics`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Limitly-Analytics-Token': ANALYTICS_TOKEN,
        },
        body: JSON.stringify({ events }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
    } catch {
    }
  }

  async shutdown(): Promise<void> {
    if (this.flushTimer) {
      clearTimeout(this.flushTimer);
      this.flushTimer = null;
    }
    await this.flush();
  }
}
