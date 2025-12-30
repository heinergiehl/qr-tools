import type { FieldValues } from "react-hook-form";

import {
  buildEmailPayload,
  buildPhonePayload,
  buildSmsPayload,
  buildTextPayload,
  buildUrlPayload,
  buildVCardPayload,
  buildWhatsAppPayload,
  buildWifiPayload,
} from "@/lib/payload";
import {
  emailSchema,
  phoneSchema,
  smsSchema,
  textSchema,
  urlSchema,
  vcardSchema,
  whatsappSchema,
  wifiSchema,
} from "@/lib/validation/schemas";

import type { QrToolConfig } from "@/components/qr/QrTool";

const commonScanTips = [
  "Increase the quiet zone to at least 4 modules.",
  "Raise error correction if you add a logo.",
  "Export at 512px or higher for print.",
  "Use high contrast colors for reliable scans.",
  "Reduce logo size if scanning feels slow.",
];

export const qrTools: QrToolConfig<FieldValues>[] = [
  {
    id: "url",
    title: "URL QR Code Generator",
    description: "Turn any web link into a permanent, static QR code that never expires.",
    schema: urlSchema,
    defaultValues: { url: "https://" },
    fields: [
      {
        name: "url",
        label: "Website URL",
        type: "text",
        placeholder: "https://example.com",
        inputType: "url",
        inputMode: "url",
      },
    ],
    buildPayload: (data) => buildUrlPayload(data as { url: string }),
    scanTips: commonScanTips,
  },
  {
    id: "text",
    title: "Text QR Code Generator",
    description: "Share a short message, note, or instruction as a static QR code.",
    schema: textSchema,
    defaultValues: { text: "" },
    fields: [
      {
        name: "text",
        label: "Text",
        type: "textarea",
        placeholder: "Type your message",
      },
    ],
    buildPayload: (data) => buildTextPayload(data as { text: string }),
    warning: (data) => {
      const length = (data as { text: string }).text.length;
      return length > 500
        ? `Long text (${length} characters) increases QR density. Consider using a URL if scans fail.`
        : undefined;
    },
    scanTips: [...commonScanTips, "If the QR is dense, increase size or shorten the text."],
  },
  {
    id: "wifi",
    title: "WiFi QR Code Generator",
    description: "Let guests join your WiFi instantly without typing passwords.",
    schema: wifiSchema,
    defaultValues: { ssid: "", password: "", encryption: "WPA", hidden: false },
    fields: [
      {
        name: "ssid",
        label: "Network name (SSID)",
        type: "text",
        placeholder: "Cafe_WiFi",
      },
      {
        name: "password",
        label: "Password",
        type: "text",
        placeholder: "Optional for open networks",
        inputType: "password",
      },
      {
        name: "encryption",
        label: "Encryption",
        type: "select",
        options: [
          { label: "WPA / WPA2", value: "WPA" },
          { label: "WEP", value: "WEP" },
          { label: "None", value: "nopass" },
        ],
      },
      {
        name: "hidden",
        label: "Hidden network",
        type: "switch",
        description: "Enable if your SSID is hidden.",
      },
    ],
    buildPayload: (data) => buildWifiPayload(data as { ssid: string; password: string; encryption: "WPA" | "WEP" | "nopass"; hidden: boolean }),
    scanTips: [...commonScanTips, "Open networks still need the SSID to be correct."] ,
  },
  {
    id: "vcard",
    title: "vCard QR Code Generator",
    description: "Share contact details in a scannable business card format.",
    schema: vcardSchema,
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      company: "",
      title: "",
      website: "",
      address: "",
      notes: "",
    },
    fields: [
      { name: "firstName", label: "First name", type: "text" },
      { name: "lastName", label: "Last name", type: "text" },
      { name: "phone", label: "Phone", type: "text", inputType: "tel", inputMode: "tel" },
      { name: "email", label: "Email", type: "text", inputType: "email", inputMode: "email" },
      { name: "company", label: "Company", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "website", label: "Website", type: "text", inputType: "url", inputMode: "url" },
      { name: "address", label: "Address", type: "text" },
      { name: "notes", label: "Notes", type: "textarea" },
    ],
    buildPayload: (data) => buildVCardPayload(data as any),
    preview: (data) => (
      <pre className="whitespace-pre-wrap">{buildVCardPayload(data as any)}</pre>
    ),
    scanTips: [...commonScanTips, "Keep only essential contact fields for faster scans."],
  },
  {
    id: "whatsapp",
    title: "WhatsApp QR Code Generator",
    description: "Start a WhatsApp chat with a prefilled message in one scan.",
    schema: whatsappSchema,
    defaultValues: { phone: "", message: "" },
    fields: [
      {
        name: "phone",
        label: "Phone (E.164)",
        type: "text",
        placeholder: "+491701234567",
        inputType: "tel",
        inputMode: "tel",
      },
      { name: "message", label: "Prefilled message", type: "textarea" },
    ],
    buildPayload: (data) => buildWhatsAppPayload(data as any),
    scanTips: commonScanTips,
  },
  {
    id: "email",
    title: "Email QR Code Generator",
    description: "Create a QR that opens a new email draft instantly.",
    schema: emailSchema,
    defaultValues: { email: "", subject: "", body: "" },
    fields: [
      { name: "email", label: "Email address", type: "text", inputType: "email", inputMode: "email" },
      { name: "subject", label: "Subject", type: "text" },
      { name: "body", label: "Body", type: "textarea" },
    ],
    buildPayload: (data) => buildEmailPayload(data as any),
    scanTips: commonScanTips,
  },
  {
    id: "phone",
    title: "Phone QR Code Generator",
    description: "Share a tap-to-call QR code for any phone number.",
    schema: phoneSchema,
    defaultValues: { phone: "" },
    fields: [{ name: "phone", label: "Phone number", type: "text", inputType: "tel", inputMode: "tel" }],
    buildPayload: (data) => buildPhonePayload(data as any),
    scanTips: commonScanTips,
  },
  {
    id: "sms",
    title: "SMS QR Code Generator",
    description: "Launch a new text message with the number and message prefilled.",
    schema: smsSchema,
    defaultValues: { phone: "", message: "" },
    fields: [
      { name: "phone", label: "Phone number", type: "text", inputType: "tel", inputMode: "tel" },
      { name: "message", label: "Message", type: "textarea" },
    ],
    buildPayload: (data) => buildSmsPayload(data as any),
    scanTips: commonScanTips,
  },
];

export const getQrTool = (id: string) => qrTools.find((tool) => tool.id === id);
