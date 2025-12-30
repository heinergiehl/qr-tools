export type SmsPayloadInput = {
  phone: string;
  message?: string;
};

export const buildSmsPayload = ({ phone, message }: SmsPayloadInput) => {
  const digits = phone.replace(/\s+/g, "");
  const text = message?.trim();
  const encodedMessage = text ? encodeURIComponent(text) : "";
  return text ? `smsto:${digits}:${encodedMessage}` : `smsto:${digits}`;
};
