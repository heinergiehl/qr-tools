export type WhatsAppPayloadInput = {
  phone: string;
  message?: string;
};

export const buildWhatsAppPayload = ({ phone, message }: WhatsAppPayloadInput) => {
  const digits = phone.replace(/\D/g, "");
  const text = message?.trim();
  const query = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${digits}${query}`;
};
