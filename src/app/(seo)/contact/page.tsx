import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Contact the QR Tools team.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="max-w-3xl space-y-4 text-sm text-ink/70">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "Contact", item: "/contact" },
        ]}
      />
      <h1 className="text-3xl font-semibold text-ink">Contact</h1>
      <p>We are happy to help with questions about QR generation or SEO pages.</p>
      <h2 className="text-xl font-semibold text-ink">Email</h2>
      <p>hello@example.com</p>
      <h2 className="text-xl font-semibold text-ink">Support hours</h2>
      <p>Monday to Friday, 9:00 to 17:00 CET.</p>
    </div>
  );
}
