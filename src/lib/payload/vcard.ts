const escapeVCardValue = (value: string) =>
  value.replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");

export type VCardPayloadInput = {
  firstName: string;
  lastName: string;
  phone?: string;
  email?: string;
  company?: string;
  title?: string;
  website?: string;
  address?: string;
  notes?: string;
};

export const buildVCardPayload = (input: VCardPayloadInput) => {
  const firstName = input.firstName.trim();
  const lastName = input.lastName.trim();
  const fullName = [firstName, lastName].filter(Boolean).join(" ").trim();
  const lines: string[] = ["BEGIN:VCARD", "VERSION:3.0"];

  lines.push(`N:${escapeVCardValue(lastName)};${escapeVCardValue(firstName)};;;`);
  if (fullName) {
    lines.push(`FN:${escapeVCardValue(fullName)}`);
  }
  if (input.company) {
    lines.push(`ORG:${escapeVCardValue(input.company)}`);
  }
  if (input.title) {
    lines.push(`TITLE:${escapeVCardValue(input.title)}`);
  }
  if (input.phone) {
    lines.push(`TEL;TYPE=WORK,VOICE:${escapeVCardValue(input.phone)}`);
  }
  if (input.email) {
    lines.push(`EMAIL:${escapeVCardValue(input.email)}`);
  }
  if (input.website) {
    lines.push(`URL:${escapeVCardValue(input.website)}`);
  }
  if (input.address) {
    lines.push(`ADR;TYPE=WORK:;;${escapeVCardValue(input.address)};;;;`);
  }
  if (input.notes) {
    lines.push(`NOTE:${escapeVCardValue(input.notes)}`);
  }

  lines.push("END:VCARD");
  return lines.join("\n");
};
