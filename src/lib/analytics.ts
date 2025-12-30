import { track } from "@vercel/analytics";

export const logEvent = (event: string, props?: Record<string, string>) => {
  if (typeof window === "undefined") return;
  try {
    track(event, props);
  } catch {
    // Analytics should never block the UI.
  }
};
