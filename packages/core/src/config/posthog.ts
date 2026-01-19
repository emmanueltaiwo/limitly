import { PostHog } from 'posthog-node';
import { envConfig } from './env.js';

let posthogClient: PostHog | null = null;

/**
 * Initialize PostHog client
 * @returns PostHog client instance or null if disabled
 */
export function initPostHog(): PostHog | null {
  if (!envConfig.POSTHOG_ENABLED || !envConfig.POSTHOG_API_KEY) {
    return null;
  }

  if (posthogClient) {
    return posthogClient;
  }

  try {
    posthogClient = new PostHog(envConfig.POSTHOG_API_KEY, {
      host: envConfig.POSTHOG_HOST,
      flushAt: 20, // Flush after 20 events
      flushInterval: 10000, // Flush every 10 seconds
    });

    return posthogClient;
  } catch (error) {
    console.error('Failed to initialize PostHog:', error);
    return null;
  }
}

/**
 * Get PostHog client instance
 * @returns PostHog client instance or null if not initialized
 */
export function getPostHog(): PostHog | null {
  if (!posthogClient) {
    return initPostHog();
  }
  return posthogClient;
}

/**
 * Shutdown PostHog client gracefully
 */
export async function shutdownPostHog(): Promise<void> {
  if (posthogClient) {
    await posthogClient.shutdown();
    posthogClient = null;
  }
}
