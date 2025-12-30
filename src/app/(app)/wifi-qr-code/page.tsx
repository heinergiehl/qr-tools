import { ToolPageShell } from "@/components/qr/ToolPageShell";
import type { FaqItem } from "@/components/seo/Faq";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "WiFi QR Code Generator",
  description: "Create a WiFi QR code so guests connect without typing passwords.",
  path: "/wifi-qr-code",
});

const faqs: FaqItem[] = [
  { question: "Do WiFi QR codes work on iOS and Android?", answer: "Most modern devices support WiFi QR scans." },
  { question: "What if my network is hidden?", answer: "Enable the hidden network toggle in the form." },
  { question: "Can I create an open network QR?", answer: "Yes, select the None option for encryption." },
  { question: "Does the QR expire when the password changes?", answer: "You will need to generate a new QR if the password changes." },
  { question: "Is my WiFi password uploaded?", answer: "No. The QR is generated locally in your browser." },
];

const tips = [
  "Use the stickers preset for small prints.",
  "Keep the QR away from glossy surfaces.",
  "Increase size for distance scanning.",
  "Use error correction Q if you add a logo.",
];

export default function WifiQrCodePage() {
  return (
    <ToolPageShell
      toolId="wifi"
      title="WiFi QR Code Generator"
      description="Let guests connect instantly with a static WiFi QR code."
      path="/wifi-qr-code"
      badge="WiFi QR"
      faqs={faqs}
      tips={tips}
    />
  );
}
