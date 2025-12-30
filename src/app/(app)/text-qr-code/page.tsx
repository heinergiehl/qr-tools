import { ToolPageShell } from "@/components/qr/ToolPageShell";
import type { FaqItem } from "@/components/seo/Faq";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Text QR Code Generator",
  description: "Create a QR code for any text message or note. Export PNG, SVG, or PDF instantly.",
  path: "/text-qr-code",
});

const faqs: FaqItem[] = [
  { question: "How much text can a QR code hold?", answer: "Shorter text scans faster. Very long messages increase density." },
  { question: "Do text QR codes expire?", answer: "No. The text is embedded directly in the QR image." },
  { question: "Can I include emojis?", answer: "Yes, UTF-8 text is supported, but keep it short for scanning." },
  { question: "Is my text uploaded?", answer: "No. Everything is generated locally in your browser." },
  { question: "Should I use a URL instead?", answer: "If the text is long, a URL often scans more reliably." },
];

const tips = [
  "Keep text short for easier scans.",
  "Increase size if the QR becomes dense.",
  "Use high contrast colors.",
  "Use 512px or higher for print.",
];

export default function TextQrCodePage() {
  return (
    <ToolPageShell
      toolId="text"
      title="Text QR Code Generator"
      description="Turn any message, note, or instruction into a static QR code."
      path="/text-qr-code"
      badge="Text QR"
      faqs={faqs}
      tips={tips}
    />
  );
}
