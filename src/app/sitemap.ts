import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://zeromrr.app",
      lastModified: new Date(),
    }
  ];
}