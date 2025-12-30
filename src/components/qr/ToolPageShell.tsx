import Link from "next/link";

import { AdSlot } from "@/components/ads/AdSlot";
import { Faq, type FaqItem } from "@/components/seo/Faq";
import { BreadcrumbJsonLd, FaqJsonLd, WebAppJsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toolMetas } from "@/lib/seo/tools";
import { useCases } from "@/lib/seo/useCases";
import { QrToolClient } from "./QrToolClient";

type ToolPageShellProps = {
  toolId: string;
  title: string;
  description: string;
  path: string;
  badge: string;
  faqs: FaqItem[];
  tips: string[];
};

export const ToolPageShell = ({ toolId, title, description, path, badge, faqs, tips }: ToolPageShellProps) => {
  const relatedTools = toolMetas.filter((tool) => tool.generatorId && tool.generatorId !== toolId).slice(0, 4);
  const toolUseCases = useCases.filter((useCase) => useCase.recommendedTool === toolId);
  const displayedUseCases = (toolUseCases.length ? toolUseCases : useCases).slice(0, 6);

  return (
    <div className="space-y-12">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: title, item: path },
        ]}
      />
      <WebAppJsonLd name={title} description={description} path={path} />

      <section className="space-y-4">
        <Badge>{badge}</Badge>
        <h1 className="text-3xl font-semibold text-ink md:text-4xl">{title}</h1>
        <p className="max-w-2xl text-lg text-ink/70">{description}</p>
        <p className="text-sm text-ink/60">Static QR codes never expire and stay private.</p>
        <Button asChild>
          <Link href="#generator">Try it now</Link>
        </Button>
      </section>

      <div id="generator">
        <QrToolClient toolId={toolId} />
      </div>

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-3 rounded-2xl border border-ink/10 bg-white/80 p-6">
          <h2 className="text-2xl font-semibold text-ink">Common issues & fixes</h2>
          <ul className="space-y-2 text-sm text-ink/70">
            <li>QR is too dense: shorten the payload or increase size.</li>
            <li>Low contrast: use a darker foreground and lighter background.</li>
            <li>Logo blocks modules: shrink the logo or enable safe mode.</li>
            <li>Scan fails at distance: increase size and quiet zone.</li>
          </ul>
        </div>
        <div className="space-y-3 rounded-2xl border border-ink/10 bg-white/80 p-6">
          <h2 className="text-2xl font-semibold text-ink">Best settings</h2>
          <ul className="space-y-2 text-sm text-ink/70">
            {tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
          <Button asChild variant="outline">
            <Link href="/tools">Explore all tools</Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-3 rounded-2xl border border-ink/10 bg-white/80 p-6">
          <h2 className="text-2xl font-semibold text-ink">How it works</h2>
          <ol className="space-y-2 text-sm text-ink/70">
            <li>1. Enter your data for this QR type.</li>
            <li>2. Customize size, margin, colors, and error correction.</li>
            <li>3. Download PNG, SVG, or print-ready PDF instantly.</li>
          </ol>
          <AdSlot label="Ad" />
        </div>
        <div className="space-y-3 rounded-2xl border border-ink/10 bg-white/80 p-6">
          <h2 className="text-2xl font-semibold text-ink">Related tools</h2>
          <div className="grid gap-2 text-sm text-ink/70">
            {relatedTools.map((tool) => (
              <Link key={tool.slug} href={tool.route} className="hover:text-ink">
                {tool.title}
              </Link>
            ))}
          </div>
          <Button asChild variant="ghost">
            <Link href="/tools">Visit tools hub</Link>
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-ink">FAQ</h2>
        <Faq items={faqs} />
        <AdSlot label="Ad" className="mt-6" />
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-ink">Use cases</h2>
        <p className="text-sm text-ink/70">
          Explore real-world ways to use {title.toLowerCase()} in print and digital campaigns.
        </p>
        <div className="grid gap-2 text-sm text-ink/70 md:grid-cols-2">
          {displayedUseCases.map((useCase) => (
            <Link key={useCase.slug} href={`/${useCase.slug}`} className="hover:text-ink">
              {useCase.title}
            </Link>
          ))}
        </div>
      </section>

      <FaqJsonLd items={faqs} />
    </div>
  );
};
