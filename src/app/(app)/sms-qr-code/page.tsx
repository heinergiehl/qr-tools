import { ToolPageShell } from "@/components/qr/ToolPageShell";
import type { FaqItem } from "@/components/seo/Faq";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "SMS QR Code Generator",
  description: "Create an SMS QR code with a prefilled message.",
  path: "/sms-qr-code",
});

const faqs: FaqItem[] = [
  { question: "What does an SMS QR code do?", answer: "It opens a text message with the number and message prefilled." },
  { question: "Do I need the country code?", answer: "Yes, use international format for best results." },
  { question: "Will it work on iOS and Android?", answer: "Most modern devices support sms or smsto links." },
  { question: "Do SMS QR codes expire?", answer: "No, static QR codes never expire." },
  { question: "Is the SMS content stored?", answer: "No. Everything stays local in your browser." },
];

const tips = [
  "Keep messages short for faster scans.",
  "Use E.164 phone numbers.",
  "Use high contrast colors.",
  "Test on both iOS and Android.",
];

export default function SmsQrCodePage() {
  return (
    <ToolPageShell
      toolId="sms"
      title="SMS QR Code Generator"
      description="Launch a new text message with a static QR code."
      path="/sms-qr-code"
      badge="SMS QR"
      faqs={faqs}
      tips={tips}
    />
  );
}
