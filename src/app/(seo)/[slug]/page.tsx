import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AdSlot } from "@/components/ads/AdSlot";
import { Faq } from "@/components/seo/Faq";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo/metadata";
import { toolRouteByGenerator } from "@/lib/seo/tools";
import { useCases } from "@/lib/seo/useCases";

type UseCasePageProps = {
  params: Promise<{ slug: string }>;
};

export const generateStaticParams = async () => useCases.map((useCase) => ({ slug: useCase.slug }));

export const generateMetadata = async ({ params }: UseCasePageProps): Promise<Metadata> => {
  const { slug } = await params;
  const useCase = useCases.find((item) => item.slug === slug);
  if (!useCase) return {};

  return buildMetadata({
    title: useCase.title,
    description: useCase.summary,
    path: `/${useCase.slug}`,
    type: "article",
  });
};

export default async function UseCasePage({ params }: UseCasePageProps) {
  const { slug } = await params;
  const useCase = useCases.find((item) => item.slug === slug);
  if (!useCase) {
    notFound();
  }

  const toolRoute = toolRouteByGenerator[useCase.recommendedTool] ?? "/qr-code-generator";
  const relatedCases = useCases.filter((item) => useCase.related.includes(item.slug));

  return (
    <div className="space-y-12">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "Use Cases", item: "/tools" },
          { name: useCase.title, item: `/${useCase.slug}` },
        ]}
      />

      <section className="space-y-4">
        <Badge>Use case</Badge>
        <h1 className="text-3xl font-semibold text-ink md:text-4xl">{useCase.title}</h1>
        <p className="max-w-2xl text-lg text-ink/70">{useCase.summary}</p>
        <p className="text-sm text-ink/60">Static QR codes never expire and stay private.</p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-3 rounded-2xl border border-ink/10 bg-white/80 p-6">
          <h2 className="text-2xl font-semibold text-ink">Why it works</h2>
          <p className="text-sm text-ink/70">{useCase.why}</p>
          <Button asChild>
            <Link href={toolRoute}>Try it now</Link>
          </Button>
        </div>
        <div className="space-y-3 rounded-2xl border border-ink/10 bg-white/80 p-6">
          <h2 className="text-2xl font-semibold text-ink">How it works</h2>
          <ol className="space-y-2 text-sm text-ink/70">
            {useCase.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <AdSlot label="Ad" />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-3 rounded-2xl border border-ink/10 bg-white/80 p-6">
          <h2 className="text-2xl font-semibold text-ink">Best settings</h2>
          <ul className="space-y-2 text-sm text-ink/70">
            {useCase.tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </div>
        <div className="space-y-3 rounded-2xl border border-ink/10 bg-white/80 p-6">
          <h2 className="text-2xl font-semibold text-ink">Try it now</h2>
          <p className="text-sm text-ink/70">
            Use the {useCase.recommendedTool.toUpperCase()} generator to create a static QR code that never expires.
          </p>
          <Button asChild>
            <Link href={toolRoute}>Open generator</Link>
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-ink">FAQ</h2>
        <Faq items={useCase.faqs} />
        <AdSlot label="Ad" className="mt-6" />
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-ink">Related tools</h2>
        <div className="grid gap-2 text-sm text-ink/70 md:grid-cols-2">
          <Link href={toolRoute} className="hover:text-ink">
            Open the {useCase.recommendedTool.toUpperCase()} generator
          </Link>
          <Link href="/qr-code-generator" className="hover:text-ink">
            Explore the all-in-one generator
          </Link>
          <Link href="/tools" className="hover:text-ink">
            Browse the tools hub
          </Link>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-ink">Related use cases</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {relatedCases.map((item) => (
            <Link key={item.slug} href={`/${item.slug}`} className="text-sm text-ink/70 hover:text-ink">
              {item.title}
            </Link>
          ))}
        </div>
      </section>

      <FaqJsonLd items={useCase.faqs} />
    </div>
  );
}
