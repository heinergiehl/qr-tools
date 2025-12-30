export type ToolMeta = {
  id: string;
  slug: string;
  title: string;
  description: string;
  route: string;
  generatorId?: string;
};

export const toolMetas: ToolMeta[] = [
  {
    id: "general",
    slug: "qr-code-generator",
    title: "QR Code Generator",
    description: "Create static QR codes with presets, logo overlay, and print-ready exports.",
    route: "/qr-code-generator",
  },
  {
    id: "url",
    slug: "url-qr-code",
    title: "URL QR Code",
    description: "Turn any link into a permanent QR code.",
    route: "/url-qr-code",
    generatorId: "url",
  },
  {
    id: "text",
    slug: "text-qr-code",
    title: "Text QR Code",
    description: "Share a short message or note with a scan.",
    route: "/text-qr-code",
    generatorId: "text",
  },
  {
    id: "wifi",
    slug: "wifi-qr-code",
    title: "WiFi QR Code",
    description: "Instant WiFi access without typing passwords.",
    route: "/wifi-qr-code",
    generatorId: "wifi",
  },
  {
    id: "vcard",
    slug: "vcard-qr-code",
    title: "vCard QR Code",
    description: "Share contact cards in one scan.",
    route: "/vcard-qr-code",
    generatorId: "vcard",
  },
  {
    id: "whatsapp",
    slug: "whatsapp-qr-code",
    title: "WhatsApp QR Code",
    description: "Open a WhatsApp chat with a prefilled message.",
    route: "/whatsapp-qr-code",
    generatorId: "whatsapp",
  },
  {
    id: "email",
    slug: "email-qr-code",
    title: "Email QR Code",
    description: "Launch a new email draft in one scan.",
    route: "/email-qr-code",
    generatorId: "email",
  },
  {
    id: "phone",
    slug: "phone-qr-code",
    title: "Phone QR Code",
    description: "Tap-to-call QR codes for any phone number.",
    route: "/phone-qr-code",
    generatorId: "phone",
  },
  {
    id: "sms",
    slug: "sms-qr-code",
    title: "SMS QR Code",
    description: "Prefill a text message with a QR scan.",
    route: "/sms-qr-code",
    generatorId: "sms",
  },
];

export const toolRouteByGenerator: Record<string, string> = toolMetas.reduce((acc, tool) => {
  if (tool.generatorId) {
    acc[tool.generatorId] = tool.route;
  }
  return acc;
}, {} as Record<string, string>);
