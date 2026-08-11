import type { MetadataRoute } from "next";
import { projectSlugs } from "@/content/projects";
import { siteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, priority: 1 },
    ...projectSlugs.map((slug) => ({
      url: `${siteUrl}/${slug}`,
      priority: 0.8,
    })),
  ];
}
