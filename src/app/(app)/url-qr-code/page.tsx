import { ToolPageShell } from "@/components/qr/ToolPageShell";
import type { FaqItem } from "@/components/seo/Faq";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "URL QR Code Generator",
  description: "Create a static QR code for any HTTPS link. Download PNG, SVG, or PDF instantly.",
  path: "/url-qr-code",
});

const faqs: FaqItem[] = [
  { question: "Do URL QR codes expire?", answer: "No. The link is encoded directly in the QR image." },
  { question: "Can I use a short link?", answer: "Yes. Shorter URLs make QR codes easier to scan." },
  { question: "Do you support HTTPS only?", answer: "Yes. Use http or https links for the URL tool." },
  { question: "Can I change the URL later?", answer: "Not with static QR codes. You would need a new QR." },
  { question: "What size should I print?", answer: "Use 512px or 1024px for print materials." },
];

const tips = [
  "Use https:// links for reliability.",
  "Keep the quiet zone at 4 modules or more.",
  "Use 512px or 1024px for print.",
  "Stick to high contrast colors.",
];

export default function UrlQrCodePage() {
  return (
    <ToolPageShell
      toolId="url"
      title="URL QR Code Generator"
      description="Turn any link into a permanent, static QR code that never expires."
      path="/url-qr-code"
      badge="URL QR"
      faqs={faqs}
      tips={tips}
    />
  );
}
