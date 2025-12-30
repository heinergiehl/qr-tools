import Link from "next/link";
import { ShieldCheck, Sparkles, Zap } from "lucide-react";

import { AdSlot } from "@/components/ads/AdSlot";
import { Faq, type FaqItem } from "@/components/seo/Faq";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo/metadata";
import { toolMetas } from "@/lib/seo/tools";
import { useCases } from "@/lib/seo/useCases";

export const metadata = buildMetadata({
  title: "Static QR Code Generator",
  description:
    "Create static QR codes that never expire. Generate QR codes for URLs, WiFi, vCards, WhatsApp, email, phone, and SMS.",
  path: "/",
});

const faqs: FaqItem[] = [
  {
    question: "Do static QR codes expire?",
    answer: "No. Static QR codes encode the data directly in the image, so they never expire.",
  },
  {
    question: "Do you store my QR payloads?",
    answer: "No. Everything is generated locally in your browser.",
  },
  {
    question: "Which formats can I download?",
    answer: "PNG, SVG, and print-ready PDF formats are available.",
  },
  {
    question: "Can I add a logo?",
    answer: "Yes, enable the logo overlay and safe mode for best scan reliability.",
  },
  {
    question: "What makes this different from dynamic QR codes?",
    answer: "Static QR codes cannot be edited or tracked, but they also never expire.",
  },
];

export default function HomePage() {
  const highlights = [
    {
      title: "Never expires",
      description: "Static QR codes store data directly in the image, so they stay valid forever.",
      icon: ShieldCheck,
    },
    {
      title: "Instant previews",
      description: "Customize size, margin, colors, and logo placement with live rendering.",
      icon: Sparkles,
    },
    {
      title: "Print ready",
      description: "Export PNG, SVG, or PDF sheets for A4 and Letter without extra tools.",
      icon: Zap,
    },
  ];

  return (
    <div className="space-y-16">
      <BreadcrumbJsonLd items={[{ name: "Home", item: "/" }]} />
      <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <Badge>Static QR Codes</Badge>
          <h1 className="text-4xl font-semibold text-ink md:text-5xl">
            The static QR generator that never expires.
          </h1>
          <p className="text-lg text-ink/70">
            Build fast, privacy-first QR codes for URLs, WiFi, vCards, WhatsApp, email, phone, and SMS. Everything stays
            in your browser.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/qr-code-generator">Create a QR code</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/tools">Browse all tools</Link>
            </Button>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-ink/60">
            <span>SVG + PNG + Print PDF</span>
            <span>100% client-side</span>
            <span>Safe logo overlay</span>
          </div>
        </div>
        <div className="rounded-3xl border border-ink/10 bg-white/80 p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-ink">Launch in minutes</h2>
            <span className="rounded-full border border-ink/10 bg-sand px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">
              No signup
            </span>
          </div>
          <ol className="mt-4 space-y-3 text-sm text-ink/70">
            <li>1. Pick a QR type and enter your payload.</li>
            <li>2. Adjust size, colors, and error correction.</li>
            <li>3. Download PNG, SVG, or print-ready PDF.</li>
          </ol>
          <div className="mt-6 grid gap-3 text-sm text-ink/70">
            <div className="rounded-xl border border-ink/10 bg-white/80 p-3">Scan quality checks built in.</div>
            <div className="rounded-xl border border-ink/10 bg-white/80 p-3">Logo-safe presets included.</div>
          </div>
          <div className="mt-6">
            <AdSlot label="Ad" />
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {highlights.map((item) => (
          <div key={item.title} className="rounded-2xl border border-ink/10 bg-white/80 p-6 shadow-sm">
            <item.icon className="h-5 w-5 text-ink/60" />
            <h3 className="mt-3 text-lg font-semibold text-ink">{item.title}</h3>
            <p className="mt-2 text-sm text-ink/70">{item.description}</p>
          </div>
        ))}
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-ink">Most-used QR tools</h2>
          <Link href="/tools" className="text-sm text-ink/70 hover:text-ink">
            See all tools
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {toolMetas.slice(1, 5).map((tool) => (
            <Link
              key={tool.slug}
              href={tool.route}
              className="rounded-2xl border border-ink/10 bg-white/70 p-5 transition hover:border-ink/30 hover:shadow"
            >
              <h3 className="text-lg font-semibold text-ink">{tool.title}</h3>
              <p className="mt-2 text-sm text-ink/70">{tool.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-ink">Popular use cases</h2>
          <p className="text-sm text-ink/70">
            Explore long-tail pages built for high-intent searches like menus, weddings, and business cards.
          </p>
          <div className="grid gap-3">
            {useCases.slice(0, 6).map((useCase) => (
              <Link key={useCase.slug} href={`/${useCase.slug}`} className="text-sm text-ink/70 hover:text-ink">
                {useCase.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-ink/10 bg-white/80 p-8 shadow-sm">
          <h3 className="text-xl font-semibold text-ink">Trust-first promise</h3>
          <p className="mt-3 text-sm text-ink/70">
            Static QR codes encode data directly in the image, so they never expire. No accounts, no database, and no
            payload tracking.
          </p>
          <div className="mt-6 grid gap-3 text-sm text-ink/70">
            <p>Built for SEO, privacy, and Core Web Vitals.</p>
            <p>High-contrast warnings and scan reliability presets.</p>
            <p>Print-ready PDFs for A4 and Letter sheets.</p>
          </div>
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
