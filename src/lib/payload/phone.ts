export type PhonePayloadInput = {
  phone: string;
};

export const buildPhonePayload = ({ phone }: PhonePayloadInput) => {
  const digits = phone.replace(/\s+/g, "");
  return `tel:${digits}`;
};
