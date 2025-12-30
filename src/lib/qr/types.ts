export type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";

export type QrColors = {
  foreground: string;
  background: string;
};

export type QrLogo = {
  enabled: boolean;
  dataUrl?: string;
  safeMode: boolean;
};

export type QrSettings = {
  size: number;
  margin: number;
  eccLevel: ErrorCorrectionLevel;
  colors: QrColors;
  logo: QrLogo;
};
