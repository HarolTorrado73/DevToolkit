import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/constants";
import { getToolSlugs } from "@/tools/registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/tools", "/docs", "/about"].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const toolRoutes = getToolSlugs().map((slug) => ({
    url: `${siteConfig.url}/tools/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...toolRoutes];
}
