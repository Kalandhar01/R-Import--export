const store = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(
  key: string,
  opts: { max?: number; windowMs?: number } = {},
): { allowed: boolean; remaining: number } {
  const { max = 10, windowMs = 60_000 } = opts;
  const now = Date.now();

  let entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    entry = { count: 1, resetAt: now + windowMs };
    store.set(key, entry);
    return { allowed: true, remaining: max - 1 };
  }

  entry.count += 1;

  if (entry.count > max) {
    return { allowed: false, remaining: 0 };
  }

  return { allowed: true, remaining: max - entry.count };
}

export function rateLimitKey(req: Request, suffix?: string): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  return `${ip}:${suffix || "default"}`;
}
