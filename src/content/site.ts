import type { VariantId } from "./types";
import { DEFAULT_VARIANT } from "./variants";

/**
 * Bare domain the site is served from, without a scheme, optionally with a
 * port for local use. Variant subdomains are derived from it, so this is the
 * only place the domain is configured. Set SITE_DOMAIN at build time — it is
 * baked into canonical and OG URLs.
 */
export const siteDomain = process.env.SITE_DOMAIN ?? "localhost:3000";

function isLocalHost(host: string): boolean {
  return /^(localhost|127\.0\.0\.1|\[::1\])(:|$)|\.localhost(:|$)/.test(host);
}

export function hostForVariant(id: VariantId): string {
  return id === DEFAULT_VARIANT ? siteDomain : `${id}.${siteDomain}`;
}

export function originForVariant(id: VariantId): string {
  const host = hostForVariant(id);
  return `${isLocalHost(host) ? "http" : "https"}://${host}`;
}

/**
 * Origin of the request actually being served, for robots and the sitemap.
 * Those are per-host and so cannot be resolved at build time.
 */
export function originFromHeaders(headers: {
  get(name: string): string | null;
}): string {
  const host = headers.get("host") ?? siteDomain;

  // A public host is served over TLS, so say so unconditionally. Deriving the
  // scheme from x-forwarded-proto emits http:// whenever TLS terminates
  // upstream and the proxy omits the header, which would then disagree with
  // the canonical tags.
  if (!isLocalHost(host)) return `https://${host}`;

  return `${headers.get("x-forwarded-proto") ?? "http"}://${host}`;
}
