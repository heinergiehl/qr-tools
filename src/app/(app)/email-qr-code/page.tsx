import { ToolPageShell } from "@/components/qr/ToolPageShell";
import type { FaqItem } from "@/components/seo/Faq";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Email QR Code Generator",
  description: "Create an email QR code that opens a new draft instantly.",
  path: "/email-qr-code",
});

const faqs: FaqItem[] = [
  { question: "What does an email QR do?", answer: "It opens a new email draft with prefilled fields." },
  { question: "Can I add a subject and body?", answer: "Yes, both fields are supported." },
  { question: "Will it work on all email apps?", answer: "Most mobile email apps support mailto links." },
  { question: "Do email QR codes expire?", answer: "No, they are static and never expire." },
  { question: "Is the content stored?", answer: "No. Everything stays local in your browser." },
];

const tips = [
  "Keep subject lines concise.",
  "Use short messages for faster scans.",
  "Use high contrast colors.",
  "Test on iOS and Android mail apps.",
];

export default function EmailQrCodePage() {
  return (
    <ToolPageShell
      toolId="email"
      title="Email QR Code Generator"
      description="Launch a new email draft instantly with a static QR code."
      path="/email-qr-code"
      badge="Email QR"
      faqs={faqs}
      tips={tips}
    />
  );
}
