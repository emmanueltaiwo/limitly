import type { Request, Response } from 'express';
import { getPostHog } from '../config/posthog.js';

interface AnalyticsEvent {
  event: string;
  distinct_id: string;
  properties: Record<string, unknown>;
}

function isValidEvent(event: unknown): event is AnalyticsEvent {
  if (!event || typeof event !== 'object' || event === null) return false;
  const e = event as Record<string, unknown>;
  return (
    typeof e.event === 'string' &&
    typeof e.distinct_id === 'string' &&
    e.properties !== null &&
    e.properties !== undefined &&
    typeof e.properties === 'object'
  );
}

export const postAnalytics = async (req: Request, res: Response): Promise<void> => {
  const posthog = getPostHog();
  if (!posthog) {
    res.status(200).json({ success: true, message: 'Analytics disabled' });
    return;
  }

  const { events } = req.body as { events?: unknown[] };

  if (!Array.isArray(events) || events.length === 0) {
    res.status(400).json({ error: 'Invalid events array' });
    return;
  }

  if (events.length > 100) {
    res.status(400).json({ error: 'Too many events in batch' });
    return;
  }

  let processed = 0;
  for (const event of events) {
    if (!isValidEvent(event)) continue;

    try {
      posthog.capture({
        distinctId: event.distinct_id,
        event: event.event,
        properties: {
          ...event.properties,
          source: 'sdk',
        },
      });
      processed++;
    } catch (error) {
      console.error('Failed to capture analytics event:', error);
    }
  }

  res.status(200).json({ success: true, processed });
};
