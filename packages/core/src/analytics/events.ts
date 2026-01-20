import { getPostHog } from '../config/posthog.js';
import type { RateLimitResult } from '../algorithms/rateLimiter.js';

/**
 * Event names for PostHog analytics
 */
export const AnalyticsEvents = {
  RATE_LIMIT_CHECK: 'rate_limit_check',
  RATE_LIMIT_ALLOWED: 'rate_limit_allowed',
  RATE_LIMIT_DENIED: 'rate_limit_denied',
  SERVICE_REQUEST: 'service_request',
  SERVICE_REGISTERED: 'service_registered',
  SERVICE_PASSWORD_VALIDATED: 'service_password_validated',
  SERVICE_PASSWORD_MISMATCH: 'service_password_mismatch',
  SERVICE_USED_WITHOUT_PASSWORD: 'service_used_without_password',
} as const;

/**
 * Properties for rate limit check events
 */
export interface RateLimitCheckProperties {
  serviceId: string;
  clientId: string;
  allowed: boolean;
  remaining: number;
  limit: number;
  reset: number;
  hasCustomConfig: boolean;
  customCapacity?: number;
  customRefillRate?: number;
  ipAddress?: string;
}

/**
 * Properties for service request events
 */
export interface ServiceRequestProperties {
  serviceId: string;
  clientId: string;
  endpoint: string;
  method: string;
  ipAddress?: string;
}

/**
 * Track a rate limit check event
 */
export function trackRateLimitCheck(
  properties: RateLimitCheckProperties
): void {
  const posthog = getPostHog();
  if (!posthog) return;

  try {
    // Track the general check event
    posthog.capture({
      distinctId: properties.clientId,
      event: AnalyticsEvents.RATE_LIMIT_CHECK,
      properties: {
        service_id: properties.serviceId,
        client_id: properties.clientId,
        allowed: properties.allowed,
        remaining: properties.remaining,
        limit: properties.limit,
        reset: properties.reset,
        has_custom_config: properties.hasCustomConfig,
        custom_capacity: properties.customCapacity,
        custom_refill_rate: properties.customRefillRate,
        ip_address: properties.ipAddress,
      },
    });

    // Track specific allowed/denied events
    const specificEvent = properties.allowed
      ? AnalyticsEvents.RATE_LIMIT_ALLOWED
      : AnalyticsEvents.RATE_LIMIT_DENIED;

    posthog.capture({
      distinctId: properties.clientId,
      event: specificEvent,
      properties: {
        service_id: properties.serviceId,
        client_id: properties.clientId,
        remaining: properties.remaining,
        limit: properties.limit,
        reset: properties.reset,
        has_custom_config: properties.hasCustomConfig,
        ip_address: properties.ipAddress,
      },
    });
  } catch (error) {
    // Silently fail analytics to not impact core functionality
    console.error('Failed to track rate limit check:', error);
  }
}

/**
 * Track a service request event
 */
export function trackServiceRequest(
  properties: ServiceRequestProperties
): void {
  const posthog = getPostHog();
  if (!posthog) return;

  try {
    posthog.capture({
      distinctId: properties.clientId,
      event: AnalyticsEvents.SERVICE_REQUEST,
      properties: {
        service_id: properties.serviceId,
        client_id: properties.clientId,
        endpoint: properties.endpoint,
        method: properties.method,
        ip_address: properties.ipAddress,
      },
    });
  } catch (error) {
    // Silently fail analytics to not impact core functionality
    console.error('Failed to track service request:', error);
  }
}

/**
 * Track rate limit result from RateLimitResult
 */
export function trackRateLimitResult(
  serviceId: string,
  clientId: string,
  result: RateLimitResult,
  options?: {
    hasCustomConfig?: boolean;
    customCapacity?: number;
    customRefillRate?: number;
    ipAddress?: string;
  }
): void {
  trackRateLimitCheck({
    serviceId,
    clientId,
    allowed: result.allowed,
    remaining: result.remaining,
    limit: result.limit,
    reset: result.reset,
    hasCustomConfig: options?.hasCustomConfig ?? false,
    customCapacity: options?.customCapacity,
    customRefillRate: options?.customRefillRate,
    ipAddress: options?.ipAddress,
  });
}

/**
 * Properties for service registry events
 */
export interface ServiceRegistryProperties {
  serviceId: string;
  ipAddress?: string;
  registeredAt?: number;
}

/**
 * Track service registration event
 */
export function trackServiceRegistered(
  properties: ServiceRegistryProperties
): void {
  const posthog = getPostHog();
  if (!posthog) return;

  try {
    posthog.capture({
      distinctId: properties.serviceId,
      event: AnalyticsEvents.SERVICE_REGISTERED,
      properties: {
        service_id: properties.serviceId,
        ip_address: properties.ipAddress,
        registered_at: properties.registeredAt,
      },
    });
  } catch (error) {
    console.error('Failed to track service registered:', error);
  }
}

/**
 * Track service password validation event
 */
export function trackServicePasswordValidated(
  properties: ServiceRegistryProperties
): void {
  const posthog = getPostHog();
  if (!posthog) return;

  try {
    posthog.capture({
      distinctId: properties.serviceId,
      event: AnalyticsEvents.SERVICE_PASSWORD_VALIDATED,
      properties: {
        service_id: properties.serviceId,
        ip_address: properties.ipAddress,
      },
    });
  } catch (error) {
    console.error('Failed to track service password validated:', error);
  }
}

/**
 * Track service password mismatch event
 */
export function trackServicePasswordMismatch(
  properties: ServiceRegistryProperties
): void {
  const posthog = getPostHog();
  if (!posthog) return;

  try {
    posthog.capture({
      distinctId: properties.serviceId,
      event: AnalyticsEvents.SERVICE_PASSWORD_MISMATCH,
      properties: {
        service_id: properties.serviceId,
        ip_address: properties.ipAddress,
        registered_at: properties.registeredAt,
      },
    });
  } catch (error) {
    console.error('Failed to track service password mismatch:', error);
  }
}

/**
 * Track service used without password event
 */
export function trackServiceUsedWithoutPassword(
  properties: ServiceRegistryProperties
): void {
  const posthog = getPostHog();
  if (!posthog) return;

  try {
    posthog.capture({
      distinctId: properties.serviceId,
      event: AnalyticsEvents.SERVICE_USED_WITHOUT_PASSWORD,
      properties: {
        service_id: properties.serviceId,
        ip_address: properties.ipAddress,
      },
    });
  } catch (error) {
    console.error('Failed to track service used without password:', error);
  }
}
