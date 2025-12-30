import { ToolPageShell } from "@/components/qr/ToolPageShell";
import type { FaqItem } from "@/components/seo/Faq";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Phone QR Code Generator",
  description: "Create a tap-to-call QR code for any phone number.",
  path: "/phone-qr-code",
});

const faqs: FaqItem[] = [
  { question: "What does a phone QR code do?", answer: "It opens the dialer with the number prefilled." },
  { question: "Do I need the country code?", answer: "Yes, use international format for best compatibility." },
  { question: "Will it work on all phones?", answer: "Most smartphones support tel links via QR." },
  { question: "Do phone QR codes expire?", answer: "No, static QR codes do not expire." },
  { question: "Is the phone number stored?", answer: "No, everything stays in your browser." },
];

const tips = [
  "Use E.164 phone numbers.",
  "Keep the QR at least 2 cm wide.",
  "Use high contrast colors.",
  "Test with multiple phones.",
];

export default function PhoneQrCodePage() {
  return (
    <ToolPageShell
      toolId="phone"
      title="Phone QR Code Generator"
      description="Share a phone number with a tap-to-call QR code."
      path="/phone-qr-code"
      badge="Phone QR"
      faqs={faqs}
      tips={tips}
    />
  );
}
