import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description: "Terms of Service for QR Tools.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="max-w-3xl space-y-4 text-sm text-ink/70">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "Terms", item: "/terms" },
        ]}
      />
      <h1 className="text-3xl font-semibold text-ink">Terms of Service</h1>
      <p>
        QR Tools provides static QR code generation on an as-is basis. By using the site, you agree that you are
        responsible for the content you encode and how you distribute it.
      </p>
      <h2 className="text-xl font-semibold text-ink">Use of service</h2>
      <p>
        Do not use QR Tools to create malicious, deceptive, or illegal content. We may update or discontinue features at
        any time.
      </p>
      <h2 className="text-xl font-semibold text-ink">No warranty</h2>
      <p>
        QR Tools is provided without warranties. We do not guarantee that QR codes will scan in every environment or
        device.
      </p>
      <h2 className="text-xl font-semibold text-ink">Contact</h2>
      <p>Reach out if you have questions about these terms.</p>
    </div>
  );
}
