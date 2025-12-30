import { ToolPageShell } from "@/components/qr/ToolPageShell";
import type { FaqItem } from "@/components/seo/Faq";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "WhatsApp QR Code Generator",
  description: "Create a WhatsApp QR code with a prefilled message.",
  path: "/whatsapp-qr-code",
});

const faqs: FaqItem[] = [
  { question: "Does the QR open WhatsApp directly?", answer: "Yes, it opens a wa.me link in the app or browser." },
  { question: "Do I need the country code?", answer: "Yes, use E.164 format such as +491701234567." },
  { question: "Can I prefill a message?", answer: "Yes, add an optional message in the form." },
  { question: "Will it work on WhatsApp Business?", answer: "Yes, the link works with both apps." },
  { question: "Does the QR expire?", answer: "No. Static QR codes never expire." },
];

const tips = [
  "Use E.164 phone numbers for reliability.",
  "Keep prefilled messages short.",
  "Use high contrast for better scans.",
  "Test on both iOS and Android.",
];

export default function WhatsappQrCodePage() {
  return (
    <ToolPageShell
      toolId="whatsapp"
      title="WhatsApp QR Code Generator"
      description="Start WhatsApp chats instantly with a static QR code."
      path="/whatsapp-qr-code"
      badge="WhatsApp QR"
      faqs={faqs}
      tips={tips}
    />
  );
}
