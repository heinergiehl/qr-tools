import type { QrSettings } from "./types";

export const defaultQrSettings: QrSettings = {
  size: 512,
  margin: 4,
  eccLevel: "M",
  colors: {
    foreground: "#111111",
    background: "#ffffff",
  },
  logo: {
    enabled: false,
    dataUrl: undefined,
    safeMode: true,
  },
};

export type QrPreset = {
  id: string;
  label: string;
  description: string;
  apply: Partial<QrSettings>;
};

export const qrPresets: QrPreset[] = [
  {
    id: "print",
    label: "Print (hi-res)",
    description: "1024px PNG plus clean SVG",
    apply: {
      size: 1024,
      margin: 4,
      eccLevel: "Q",
    },
  },
  {
    id: "stickers",
    label: "Stickers",
    description: "Extra quiet zone for small prints",
    apply: {
      size: 512,
      margin: 8,
      eccLevel: "Q",
    },
  },
  {
    id: "dark",
    label: "Dark mode safe",
    description: "High contrast light-on-dark",
    apply: {
      eccLevel: "Q",
      colors: {
        foreground: "#f8fafc",
        background: "#0b0f1a",
      },
    },
  },
];

export const applyPreset = (settings: QrSettings, preset: QrPreset): QrSettings => ({
  ...settings,
  ...preset.apply,
  colors: {
    ...settings.colors,
    ...preset.apply.colors,
  },
  logo: {
    ...settings.logo,
    ...preset.apply.logo,
  },
});

const matchesColor = (value?: string, current?: string) =>
  value ? value.toLowerCase() === current?.toLowerCase() : true;

export const isPresetMatch = (settings: QrSettings, preset: QrPreset) => {
  const apply = preset.apply;

  if (apply.size !== undefined && settings.size !== apply.size) return false;
  if (apply.margin !== undefined && settings.margin !== apply.margin) return false;
  if (apply.eccLevel !== undefined && settings.eccLevel !== apply.eccLevel) return false;
  if (!matchesColor(apply.colors?.foreground, settings.colors.foreground)) return false;
  if (!matchesColor(apply.colors?.background, settings.colors.background)) return false;
  if (apply.logo?.enabled !== undefined && settings.logo.enabled !== apply.logo.enabled) return false;
  if (apply.logo?.safeMode !== undefined && settings.logo.safeMode !== apply.logo.safeMode) return false;

  return true;
};
