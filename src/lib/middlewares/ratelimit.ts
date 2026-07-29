import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let redis: Redis | null = null;
let publicLimiter: Ratelimit | null = null;
let adminLimiter: Ratelimit | null = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  const publicMaxReq = parseInt(process.env.RATE_LIMIT_PUBLIC_MAX_REQUESTS || "60");
  const publicWindow = `${process.env.RATE_LIMIT_PUBLIC_WINDOW_SECS || "60"} s` as Parameters<typeof Ratelimit.slidingWindow>[1];
  
  publicLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(publicMaxReq, publicWindow),
    analytics: true,
  });

  const adminMaxReq = parseInt(process.env.RATE_LIMIT_ADMIN_MAX_REQUESTS || "300");
  const adminWindow = `${process.env.RATE_LIMIT_ADMIN_WINDOW_SECS || "60"} s` as Parameters<typeof Ratelimit.slidingWindow>[1];

  adminLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(adminMaxReq, adminWindow),
    analytics: true,
  });
}

export async function checkPublicRateLimit(identifier: string) {
  if (!publicLimiter) {
    // In local dev without Redis configured, allow the request
    return { success: true, remaining: 10, reset: Date.now() + 3600000 };
  }
  return await publicLimiter.limit(identifier);
}

export async function checkAdminRateLimit(identifier: string) {
  if (!adminLimiter) {
    return { success: true, remaining: 10, reset: Date.now() + 3600000 };
  }
  return await adminLimiter.limit(identifier);
}

// Custom Auth Exponential Backoff
const AUTH_BASE_DELAY = parseInt(process.env.RATE_LIMIT_AUTH_BASE_DELAY_MS || "1000");
const AUTH_MAX_DELAY = parseInt(process.env.RATE_LIMIT_AUTH_MAX_DELAY_MS || "3600000");

type BackoffData = { attempts: number; lastAttempt: number };

export async function checkAuthRateLimit(ip: string, email: string) {
  if (!redis) {
    return { success: true, retryAfter: 0 };
  }

  const now = Date.now();
  const keys = [`auth:backoff:ip:${ip}`, `auth:backoff:email:${email}`];
  
  const results = await redis.mget<[BackoffData | null, BackoffData | null]>(...keys);
  
  let nextAllowedTime = 0;

  for (const data of results) {
    if (data) {
      // delay = base * (2 ^ attempts)
      let delay = AUTH_BASE_DELAY * Math.pow(2, data.attempts);
      if (delay > AUTH_MAX_DELAY) delay = AUTH_MAX_DELAY;

      const allowedAt = data.lastAttempt + delay;
      if (allowedAt > nextAllowedTime) {
        nextAllowedTime = allowedAt;
      }
    }
  }

  if (now < nextAllowedTime) {
    return { success: false, retryAfter: Math.ceil((nextAllowedTime - now) / 1000) };
  }

  return { success: true, retryAfter: 0 };
}

export async function incrementAuthBackoff(ip: string, email: string) {
  if (!redis) return;

  const now = Date.now();
  const keys = [`auth:backoff:ip:${ip}`, `auth:backoff:email:${email}`];
  
  const results = await redis.mget<[BackoffData | null, BackoffData | null]>(...keys);

  const ipData = results[0];
  const emailData = results[1];

  const newIpData = { attempts: (ipData?.attempts || 0) + 1, lastAttempt: now };
  const newEmailData = { attempts: (emailData?.attempts || 0) + 1, lastAttempt: now };

  // Set with expiry based on max delay + some buffer (e.g. 2x max delay)
  const ttlSecs = Math.ceil((AUTH_MAX_DELAY * 2) / 1000);
  
  const pipeline = redis.pipeline();
  pipeline.set(keys[0], newIpData, { ex: ttlSecs });
  pipeline.set(keys[1], newEmailData, { ex: ttlSecs });
  await pipeline.exec();
}

export async function clearAuthBackoff(ip: string, email: string) {
  if (!redis) return;
  const keys = [`auth:backoff:ip:${ip}`, `auth:backoff:email:${email}`];
  await redis.del(...keys);
}
