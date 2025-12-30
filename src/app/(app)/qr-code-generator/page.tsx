import Link from "next/link";

import { AdSlot } from "@/components/ads/AdSlot";
import { Faq, type FaqItem } from "@/components/seo/Faq";
import { BreadcrumbJsonLd, FaqJsonLd, WebAppJsonLd } from "@/components/seo/JsonLd";
import { QrToolTabs } from "@/components/qr/QrToolTabs";
import { Badge } from "@/components/ui/badge";
import { buildMetadata } from "@/lib/seo/metadata";
import { toolMetas } from "@/lib/seo/tools";
import { useCases } from "@/lib/seo/useCases";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "QR Code Generator",
  description:
    "Create static QR codes for URLs, WiFi, vCards, WhatsApp, email, phone, SMS, and text. Export PNG, SVG, or PDF.",
  path: "/qr-code-generator",
});

const faqs: FaqItem[] = [
  {
    question: "Do static QR codes expire?",
    answer: "No. The data is encoded in the QR image, so it never expires.",
  },
  {
    question: "Can I download SVG and PDF files?",
    answer: "Yes, SVG and print-ready PDF exports are included.",
  },
  {
    question: "Does the generator run in my browser?",
    answer: "Yes, all QR generation runs client-side for privacy.",
  },
  {
    question: "What error correction should I use?",
    answer: "Use M for normal codes and Q when adding a logo.",
  },
  {
    question: "Can I add a logo?",
    answer: "Yes, upload a logo and enable safe mode for better scans.",
  },
];

export default function QrCodeGeneratorPage() {
  return (
    <div className="space-y-12">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "QR Code Generator", item: "/qr-code-generator" },
        ]}
      />
      <WebAppJsonLd name="QR Code Generator" description={siteConfig.description} path="/qr-code-generator" />

      <section className="space-y-4">
        <Badge>QR Code Generator</Badge>
        <h1 className="text-3xl font-semibold text-ink md:text-4xl">Build static QR codes that never expire</h1>
        <p className="max-w-2xl text-lg text-ink/70">
          Choose a QR type, customize colors and size, then download PNG, SVG, or PDF. Everything stays in your browser.
        </p>
      </section>

      <QrToolTabs />

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-3 rounded-2xl border border-ink/10 bg-white/80 p-6">
          <h2 className="text-2xl font-semibold text-ink">How it works</h2>
          <ol className="space-y-2 text-sm text-ink/70">
            <li>1. Enter your payload (URL, WiFi, vCard, or message).</li>
            <li>2. Customize size, margin, colors, and error correction.</li>
            <li>3. Download PNG, SVG, or print-ready PDF instantly.</li>
          </ol>
          <AdSlot label="Ad" />
        </div>
        <div className="space-y-3 rounded-2xl border border-ink/10 bg-white/80 p-6">
          <h2 className="text-2xl font-semibold text-ink">Best settings</h2>
          <ul className="space-y-2 text-sm text-ink/70">
            <li>Use 512px or 1024px for print materials.</li>
            <li>Increase the quiet zone if scanning is slow.</li>
            <li>Enable error correction Q when using logos.</li>
            <li>Stick to high contrast colors for reliability.</li>
          </ul>
        </div>
      </section>

      <section className="rounded-2xl border border-ink/10 bg-white/80 p-6">
        <h2 className="text-2xl font-semibold text-ink">Common issues & fixes</h2>
        <div className="mt-4 grid gap-3 text-sm text-ink/70 md:grid-cols-2">
          <p>QR is too dense: shorten the payload or increase size.</p>
          <p>Low contrast: use darker foreground and lighter background.</p>
          <p>Logo blocks modules: shrink the logo or enable safe mode.</p>
          <p>Scan fails at distance: increase size and quiet zone.</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-ink">FAQ</h2>
        <Faq items={faqs} />
        <AdSlot label="Ad" className="mt-6" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-ink">Popular tools</h2>
        <div className="grid gap-3 text-sm text-ink/70 md:grid-cols-2">
          {toolMetas.slice(1, 5).map((tool) => (
            <Link key={tool.slug} href={tool.route} className="hover:text-ink">
              {tool.title}
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-ink">Popular use cases</h2>
        <div className="grid gap-3 text-sm text-ink/70 md:grid-cols-2">
          {useCases.slice(0, 6).map((useCase) => (
            <Link key={useCase.slug} href={`/${useCase.slug}`} className="hover:text-ink">
              {useCase.title}
            </Link>
          ))}
        </div>
      </section>

      <FaqJsonLd items={faqs} />
    </div>
  );
}
