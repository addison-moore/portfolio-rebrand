import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { originFromHeaders } from "@/content/site";
import { getVariant, variantIdForHost } from "@/content/variants";

/** Per-host, so it cannot be generated at build time. */
export default async function robots(): Promise<MetadataRoute.Robots> {
  const requestHeaders = await headers();
  const variant = getVariant(
    variantIdForHost(requestHeaders.get("host") ?? ""),
  );

  if (!variant?.indexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${originFromHeaders(requestHeaders)}/sitemap.xml`,
  };
}
