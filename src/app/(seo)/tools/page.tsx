import Link from "next/link";

import { AdSlot } from "@/components/ads/AdSlot";
import { Faq, type FaqItem } from "@/components/seo/Faq";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import { ToolsFilter } from "@/components/seo/ToolsFilter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site";
import { toolMetas } from "@/lib/seo/tools";
import { useCases } from "@/lib/seo/useCases";

export const metadata = buildMetadata({
  title: "QR Tools Hub",
  description:
    "Explore every static QR generator and use-case page. Build QR codes for URLs, WiFi, vCards, WhatsApp, and more.",
  path: "/tools",
});

const faqs: FaqItem[] = [
  {
    question: "What makes these QR codes static?",
    answer: "The data is embedded directly inside the QR image, so the code never expires.",
  },
  {
    question: "Which tools are included?",
    answer: "URL, text, WiFi, vCard, WhatsApp, email, phone, and SMS QR generators.",
  },
  {
    question: "Do you store my QR content?",
    answer: "No. Everything stays in your browser by default.",
  },
  {
    question: "Can I print these QR codes?",
    answer: "Yes, download PNG, SVG, or print-ready PDF formats.",
  },
  {
    question: "Will you add dynamic QR codes later?",
    answer: "Dynamic QR codes are planned for a future version.",
  },
];

export default function ToolsPage() {
  return (
    <div className="space-y-12">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "Tools", item: "/tools" },
        ]}
      />
      <section className="space-y-4">
        <Badge>Tools Hub</Badge>
        <h1 className="text-3xl font-semibold text-ink md:text-4xl">All QR code tools</h1>
        <p className="max-w-2xl text-lg text-ink/70">
          {siteConfig.name} gives you a full toolkit for static QR codes. Every generator is fast, privacy-first, and
          designed for reliable scans.
        </p>
      </section>

      <section>
        <ToolsFilter tools={toolMetas} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-ink">Use-case directory</h2>
        <p className="text-sm text-ink/70">
          Explore high-intent pages for menus, weddings, reviews, and more.
        </p>
        <div className="grid gap-2 text-sm text-ink/70 md:grid-cols-2">
          {useCases.slice(0, 12).map((useCase) => (
            <Link key={useCase.slug} href={`/${useCase.slug}`} className="hover:text-ink">
              {useCase.title}
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-4 rounded-2xl border border-ink/10 bg-white/80 p-6">
          <h2 className="text-2xl font-semibold text-ink">How it works</h2>
          <ol className="space-y-3 text-sm text-ink/70">
            <li>1. Choose a generator and enter your data.</li>
            <li>2. Pick presets or customize colors, size, and margin.</li>
            <li>3. Download PNG, SVG, or PDF instantly.</li>
          </ol>
          <AdSlot label="Ad" />
        </div>
        <div className="space-y-4 rounded-2xl border border-ink/10 bg-white/80 p-6">
          <h2 className="text-2xl font-semibold text-ink">Best settings</h2>
          <ul className="space-y-2 text-sm text-ink/70">
            <li>Use 512px or 1024px for print.</li>
            <li>Keep the quiet zone at 4 modules or more.</li>
            <li>Enable error correction Q when adding a logo.</li>
            <li>Stick to high-contrast colors for faster scans.</li>
          </ul>
          <Button asChild>
            <Link href="/qr-code-generator">Try the generator</Link>
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-ink">FAQ</h2>
        <Faq items={faqs} />
        <AdSlot label="Ad" className="mt-6" />
      </section>

      <FaqJsonLd items={faqs} />
    </div>
  );
}
