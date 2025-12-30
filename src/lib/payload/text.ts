export type TextPayloadInput = {
  text: string;
};

export const buildTextPayload = ({ text }: TextPayloadInput) => text;
