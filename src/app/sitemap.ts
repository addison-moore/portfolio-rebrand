import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { originFromHeaders } from "@/content/site";
import { getVariant, variantIdForHost } from "@/content/variants";

/** Per-host, so it cannot be generated at build time. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const requestHeaders = await headers();
  const variant = getVariant(
    variantIdForHost(requestHeaders.get("host") ?? ""),
  );

  if (!variant?.indexable) return [];

  const origin = originFromHeaders(requestHeaders);

  return [
    { url: origin, priority: 1 },
    ...variant.projects.map((slug) => ({
      url: `${origin}/${slug}`,
      priority: 0.8,
    })),
  ];
}
