export type UrlPayloadInput = {
  url: string;
};

export const buildUrlPayload = ({ url }: UrlPayloadInput) => url.trim();
