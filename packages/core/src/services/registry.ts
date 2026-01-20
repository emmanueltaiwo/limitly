import crypto from 'crypto';
import { registryRedisClient } from '../config/registry-redis.js';
import {
  trackServiceRegistered,
  trackServicePasswordValidated,
  trackServicePasswordMismatch,
  trackServiceUsedWithoutPassword,
} from '../analytics/events.js';

interface RegistryData {
  password_hash: string;
  registered_at: number;
  last_seen: number;
}

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

function getRegistryKey(serviceId: string): string {
  return `service_registry:${serviceId}`;
}

export async function checkServiceRegistry(
  serviceId: string,
  servicePassword?: string,
  ipAddress?: string
): Promise<{ valid: boolean; registered: boolean; collision?: boolean }> {
  if (!servicePassword) {
    console.warn(
      `[INFO] Service ID '${serviceId}' used without password. Rate limits may collide with other users. Recommendation: Set servicePassword or use redisUrl for isolation.`
    );
    trackServiceUsedWithoutPassword({ serviceId, ipAddress });
    return { valid: true, registered: false };
  }

  const key = getRegistryKey(serviceId);
  const existing = await registryRedisClient.get(key);

  const passwordHash = hashPassword(servicePassword);
  const now = Date.now();
  const ttl = 30 * 24 * 60 * 60;

  if (!existing) {
    const data: RegistryData = {
      password_hash: passwordHash,
      registered_at: now,
      last_seen: now,
    };
    await registryRedisClient.set(key, JSON.stringify(data), { EX: ttl });
    trackServiceRegistered({ serviceId, ipAddress, registeredAt: now });
    return { valid: true, registered: true };
  }

  try {
    const data = JSON.parse(existing) as RegistryData;
    const storedHash = data.password_hash;

    if (storedHash === passwordHash) {
      data.last_seen = now;
      await registryRedisClient.set(key, JSON.stringify(data), { EX: ttl });
      trackServicePasswordValidated({ serviceId, ipAddress });
      return { valid: true, registered: true };
    } else {
      const registeredDate = new Date(data.registered_at).toISOString();
      console.warn(
        `[WARN] Service ID '${serviceId}' password mismatch. ServiceId was registered at ${registeredDate}. Rate limits may collide with other users. Recommendation: Use unique serviceId or provide redisUrl.`
      );
      trackServicePasswordMismatch({
        serviceId,
        ipAddress,
        registeredAt: data.registered_at,
      });
      return { valid: true, registered: true, collision: true };
    }
  } catch (error) {
    console.error('Registry data parse error:', error);
    return { valid: true, registered: false };
  }
}
