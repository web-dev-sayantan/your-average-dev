import type { MetadataRoute } from "next";
import { getAllRants } from "@/lib/mdx";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.anaverage.dev";

  // Static routes
  const routes = [
    "",
    "/now",
    "/work",
    "/rants",
    "/resume",
    "/interests",
    "/uses",
    "/say-hello",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic rant routes
  const rants = await getAllRants();
  const rantRoutes = rants.map((rant) => ({
    url: `${baseUrl}/rants/${rant.slug}`,
    lastModified: new Date(rant.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...rantRoutes];
}
