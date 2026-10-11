import type { NextApiRequest } from "next";

/**
 * Prefer edge-provided client IPs (Cloudflare / reverse proxies). Never trust
 * a raw X-Forwarded-For chain alone for auth — only for coarse rate limiting.
 */
export function clientIp(req: NextApiRequest): string {
  const cf = headerValue(req, "cf-connecting-ip");
  if (cf) return cf;

  const realIp = headerValue(req, "x-real-ip");
  if (realIp) return realIp;

  const forwarded = headerValue(req, "x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  return req.socket.remoteAddress ?? "unknown";
}

function headerValue(req: NextApiRequest, name: string): string | undefined {
  const value = req.headers[name];
  if (typeof value === "string") return value.trim() || undefined;
  if (Array.isArray(value) && value[0]) return value[0].trim() || undefined;
  return undefined;
}

/** Browsers send Origin on fetch POST; missing/foreign Origin is rejected. */
export function isSameOrigin(req: NextApiRequest): boolean {
  const origin = headerValue(req, "origin");
  const host = headerValue(req, "host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

/**
 * When Sec-Fetch-Site is present, require same-origin / same-site / none.
 * Older clients omit the header — those still pass the Origin check.
 */
export function isAllowedFetchSite(req: NextApiRequest): boolean {
  const site = headerValue(req, "sec-fetch-site");
  if (!site) return true;
  return site === "same-origin" || site === "same-site" || site === "none";
}

export function setNoStore(res: { setHeader: (name: string, value: string) => void }): void {
  res.setHeader("Cache-Control", "no-store, max-age=0");
  res.setHeader("Pragma", "no-cache");
}
