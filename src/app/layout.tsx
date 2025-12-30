import type { Metadata } from "next";
import { Fraunces, Sora } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";
import { PageViewTracker } from "@/components/layout/PageViewTracker";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { siteConfig } from "@/lib/site";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Static QR Code Generator`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${fraunces.variable}`}>
      <body className="min-h-screen bg-shell text-ink antialiased">
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
            <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-moss/30 blur-[120px]" />
            <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-coral/20 blur-[130px]" />
          </div>
          <SiteHeader />
          <PageViewTracker />
          <main className="mx-auto w-full max-w-6xl px-6 py-12">{children}</main>
          <SiteFooter />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
