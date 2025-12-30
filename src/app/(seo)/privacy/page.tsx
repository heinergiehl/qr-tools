import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Learn how QR Tools protects your privacy and processes data locally.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl space-y-4 text-sm text-ink/70">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "Privacy", item: "/privacy" },
        ]}
      />
      <h1 className="text-3xl font-semibold text-ink">Privacy Policy</h1>
      <p>
        QR Tools runs entirely in your browser. Your QR payloads, logos, and customizations are processed locally and are
        not sent to our servers by default.
      </p>
      <h2 className="text-xl font-semibold text-ink">What we collect</h2>
      <p>
        We only collect basic, privacy-friendly analytics events such as page views and download actions. Payload content
        is never logged.
      </p>
      <h2 className="text-xl font-semibold text-ink">Cookies</h2>
      <p>
        We may use essential cookies for analytics if enabled. If your region requires consent, present a cookie banner
        before tracking.
      </p>
      <h2 className="text-xl font-semibold text-ink">Contact</h2>
      <p>Questions about privacy? Reach us at the contact page.</p>
    </div>
  );
}
