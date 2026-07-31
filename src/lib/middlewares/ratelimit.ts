import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let contactLimiter: Ratelimit | null = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  // 10 requests per hour per IP — the only rate-limited endpoint
  contactLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "1 h"),
    analytics: true,
    prefix: "ratelimit:contact",
  });
}

/**
 * Rate-limits the contact form endpoint: 10 requests/hour/IP.
 * Returns { success, remaining, reset } or allows through in dev
 * when Redis is not configured.
 */
export async function checkContactRateLimit(ip: string) {
  if (!contactLimiter) {
    // In local dev without Redis configured, allow the request
    return { success: true, remaining: 10, reset: Date.now() + 3600000 };
  }
  return await contactLimiter.limit(ip);
}
