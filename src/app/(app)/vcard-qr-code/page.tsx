import { ToolPageShell } from "@/components/qr/ToolPageShell";
import type { FaqItem } from "@/components/seo/Faq";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "vCard QR Code Generator",
  description: "Create a vCard QR code to share contact details instantly.",
  path: "/vcard-qr-code",
});

const faqs: FaqItem[] = [
  { question: "What is a vCard QR code?", answer: "It encodes contact details that phones can save directly." },
  { question: "Do I need to include every field?", answer: "No. Keep only essential details for faster scans." },
  { question: "Is it compatible with iPhone and Android?", answer: "Yes, vCard is supported by most devices." },
  { question: "Can I update the contact later?", answer: "Static QR codes cannot be edited once printed." },
  { question: "Is my contact data stored?", answer: "No, everything stays in your browser." },
];

const tips = [
  "Keep contact fields concise.",
  "Use a 512px export for business cards.",
  "Use high contrast colors.",
  "Enable error correction Q if using a logo.",
];

export default function VcardQrCodePage() {
  return (
    <ToolPageShell
      toolId="vcard"
      title="vCard QR Code Generator"
      description="Share contact details with a scan using vCard QR codes."
      path="/vcard-qr-code"
      badge="vCard QR"
      faqs={faqs}
      tips={tips}
    />
  );
}
