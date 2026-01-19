/**
 * Analytics module for PostHog event tracking
 * 
 * This module provides utilities for tracking events in the Limitly core service.
 * Events are automatically tracked for rate limit checks and service requests.
 */

export {
  AnalyticsEvents,
  trackRateLimitCheck,
  trackServiceRequest,
  trackRateLimitResult,
  type RateLimitCheckProperties,
  type ServiceRequestProperties,
} from './events.js';
