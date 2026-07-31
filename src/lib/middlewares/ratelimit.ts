import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const isDev = process.env.NODE_ENV === "development";

// Configurable thresholds with generous development/testing defaults
const AUTH_LIMIT = parseInt(process.env.RATE_LIMIT_AUTH_MAX || (isDev ? "60" : "30"), 10);
const PUBLIC_LIMIT = parseInt(process.env.RATE_LIMIT_PUBLIC_MAX || (isDev ? "600" : "300"), 10);
const ADMIN_LIMIT = parseInt(process.env.RATE_LIMIT_ADMIN_MAX || (isDev ? "2000" : "1000"), 10);
const CONTACT_LIMIT = parseInt(process.env.RATE_LIMIT_CONTACT_MAX || (isDev ? "50" : "20"), 10);

// In-Memory Sliding Window Rate Limiter for local / serverless fallback
class MemoryRateLimiter {
  private hits: Map<string, number[]> = new Map();

  limit(key: string, maxHits: number, windowMs: number) {
    const now = Date.now();
    const windowStart = now - windowMs;

    let timestamps = this.hits.get(key) || [];
    timestamps = timestamps.filter((ts) => ts > windowStart);

    if (timestamps.length >= maxHits) {
      const oldestHit = timestamps[0];
      const reset = oldestHit + windowMs;
      this.hits.set(key, timestamps);
      return {
        success: false,
        limit: maxHits,
        remaining: 0,
        reset,
      };
    }

    timestamps.push(now);
    this.hits.set(key, timestamps);

    return {
      success: true,
      limit: maxHits,
      remaining: maxHits - timestamps.length,
      reset: now + windowMs,
    };
  }
}

const memoryLimiter = new MemoryRateLimiter();

let redis: Redis | null = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

const authUpstash = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(AUTH_LIMIT, "1 m"), prefix: "rl:auth" })
  : null;

const publicUpstash = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(PUBLIC_LIMIT, "1 m"), prefix: "rl:public" })
  : null;

const adminUpstash = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(ADMIN_LIMIT, "1 m"), prefix: "rl:admin" })
  : null;

const contactUpstash = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(CONTACT_LIMIT, "1 h"), prefix: "rl:contact" })
  : null;

export type RateLimitTier = "auth" | "public" | "admin" | "contact";

export async function checkRateLimit(identifier: string, tier: RateLimitTier) {
  if (tier === "auth") {
    if (authUpstash) return await authUpstash.limit(identifier);
    return memoryLimiter.limit(`auth:${identifier}`, AUTH_LIMIT, 60_000);
  }

  if (tier === "admin") {
    if (adminUpstash) return await adminUpstash.limit(identifier);
    return memoryLimiter.limit(`admin:${identifier}`, ADMIN_LIMIT, 60_000);
  }

  if (tier === "contact") {
    if (contactUpstash) return await contactUpstash.limit(identifier);
    return memoryLimiter.limit(`contact:${identifier}`, CONTACT_LIMIT, 3_600_000);
  }

  // Public tier default
  if (publicUpstash) return await publicUpstash.limit(identifier);
  return memoryLimiter.limit(`public:${identifier}`, PUBLIC_LIMIT, 60_000);
}

export async function checkContactRateLimit(ip: string) {
  return await checkRateLimit(ip, "contact");
}
