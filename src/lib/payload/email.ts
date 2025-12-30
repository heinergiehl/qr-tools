export type EmailPayloadInput = {
  email: string;
  subject?: string;
  body?: string;
};

export const buildEmailPayload = ({ email, subject, body }: EmailPayloadInput) => {
  const params = new URLSearchParams();
  if (subject?.trim()) {
    params.set("subject", subject.trim());
  }
  if (body?.trim()) {
    params.set("body", body.trim());
  }
  const query = params.toString();
  return `mailto:${email}${query ? `?${query}` : ""}`;
};
