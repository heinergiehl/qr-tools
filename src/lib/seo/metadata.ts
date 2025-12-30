import type { Metadata } from "next";

import { absoluteUrl, siteConfig } from "@/lib/site";

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
};

export const buildMetadata = ({ title, description, path, type = "website" }: MetadataInput): Metadata => ({
  title,
  description,
  alternates: { canonical: path },
  openGraph: {
    title,
    description,
    url: absoluteUrl(path),
    siteName: siteConfig.name,
    type,
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    title,
    description,
  },
});
