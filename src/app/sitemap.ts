import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";
import { toolMetas } from "@/lib/seo/tools";
import { useCases } from "@/lib/seo/useCases";

const staticRoutes = ["/", "/tools", "/privacy", "/terms", "/imprint", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const toolRoutes = toolMetas.map((tool) => tool.route);
  const useCaseRoutes = useCases.map((useCase) => `/${useCase.slug}`);

  return [...staticRoutes, ...toolRoutes, ...useCaseRoutes].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
  }));
}
