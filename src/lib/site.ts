export const siteConfig = {
  name: "QR Tools",
  description: "Create static QR codes that never expire. Generate QR codes for URLs, WiFi, vCards, WhatsApp, email, phone, and SMS.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  twitterHandle: "@qrtools",
};

export const absoluteUrl = (path: string) => {
  if (path.startsWith("http")) return path;
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
};
