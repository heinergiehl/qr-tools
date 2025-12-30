import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Imprint",
  description: "Legal imprint and contact details for QR Tools.",
  path: "/imprint",
});

export default function ImprintPage() {
  return (
    <div className="max-w-3xl space-y-4 text-sm text-ink/70">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "Imprint", item: "/imprint" },
        ]}
      />
      <h1 className="text-3xl font-semibold text-ink">Imprint</h1>
      <p>This imprint is provided in accordance with German law.</p>
      <h2 className="text-xl font-semibold text-ink">Responsible entity</h2>
      <p>
        QR Tools GmbH
        <br />
        Example Street 1
        <br />
        10115 Berlin
        <br />
        Germany
      </p>
      <h2 className="text-xl font-semibold text-ink">Contact</h2>
      <p>
        Email: hello@example.com
        <br />
        Phone: +49 30 000000
      </p>
      <h2 className="text-xl font-semibold text-ink">VAT</h2>
      <p>VAT ID: DE000000000</p>
    </div>
  );
}
