"use client";

import { useState } from "react";
import { ArrowLeftRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { sanitizeSvg, svgToDataUrl } from "@/lib/qr/logo";
import type { ErrorCorrectionLevel, QrSettings } from "@/lib/qr/types";

const FILE_SIZE_LIMIT = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/svg+xml"];

const eccOptions: { label: string; value: ErrorCorrectionLevel }[] = [
  { label: "L - Small", value: "L" },
  { label: "M - Default", value: "M" },
  { label: "Q - Logo Safe", value: "Q" },
  { label: "H - High", value: "H" },
];

type QrCustomizerProps = {
  settings: QrSettings;
  onChange: (settings: QrSettings) => void;
};

export const QrCustomizer = ({ settings, onChange }: QrCustomizerProps) => {
  const [logoError, setLogoError] = useState<string | null>(null);
  const logoToggleId = "logo-toggle";
  const logoSafeId = "logo-safe";
  const logoFileId = "logo-file";
  const sizeInputId = "qr-size-input";
  const marginInputId = "qr-margin-input";

  const update = (patch: Partial<QrSettings>) => {
    onChange({
      ...settings,
      ...patch,
      colors: {
        ...settings.colors,
        ...patch.colors,
      },
      logo: {
        ...settings.logo,
        ...patch.logo,
      },
    });
  };

  const clampNumber = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

  const handleLogoUpload = async (file?: File) => {
    if (!file) return;
    if (file.size > FILE_SIZE_LIMIT) {
      setLogoError("Logo must be 5MB or smaller.");
      return;
    }
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setLogoError("Only PNG, JPG, or SVG files are allowed.");
      return;
    }

    setLogoError(null);

    if (file.type === "image/svg+xml") {
      const text = await file.text();
      const sanitized = sanitizeSvg(text);
      update({
        logo: {
          enabled: true,
          dataUrl: svgToDataUrl(sanitized),
          safeMode: settings.logo.safeMode,
        },
        eccLevel: "Q",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      update({
        logo: {
          enabled: true,
          dataUrl: reader.result as string,
          safeMode: settings.logo.safeMode,
        },
        eccLevel: "Q",
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="qr-size">Size (px)</Label>
          <div className="flex items-center gap-2">
            <Input
              id={sizeInputId}
              type="number"
              min={256}
              max={2048}
              step={64}
              value={settings.size}
              onChange={(event) =>
                update({ size: clampNumber(Number(event.target.value || 0), 256, 2048) })
              }
              className="h-8 w-24"
              aria-label="QR size in pixels"
            />
          </div>
        </div>
        <Slider
          id="qr-size"
          min={256}
          max={2048}
          step={64}
          value={[settings.size]}
          onValueChange={(value) => update({ size: value[0] })}
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="qr-margin">Quiet zone (modules)</Label>
          <Input
            id={marginInputId}
            type="number"
            min={2}
            max={12}
            step={1}
            value={settings.margin}
            onChange={(event) =>
              update({ margin: clampNumber(Number(event.target.value || 0), 2, 12) })
            }
            className="h-8 w-20"
            aria-label="Quiet zone in modules"
          />
        </div>
        <Slider
          id="qr-margin"
          min={2}
          max={12}
          step={1}
          value={[settings.margin]}
          onValueChange={(value) => update({ margin: value[0] })}
        />
      </div>

      <div className="space-y-2">
        <Label>Error correction</Label>
        <Select value={settings.eccLevel} onValueChange={(value) => update({ eccLevel: value as ErrorCorrectionLevel })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {eccOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-ink/60">Higher levels handle damage better but increase QR density.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Foreground</Label>
          <div className="flex items-center gap-2">
            <Input
              type="color"
              value={settings.colors.foreground}
              onChange={(event) =>
                update({ colors: { foreground: event.target.value, background: settings.colors.background } })
              }
              aria-label="Foreground color"
            />
            <Input
              type="text"
              value={settings.colors.foreground}
              onChange={(event) =>
                update({ colors: { foreground: event.target.value, background: settings.colors.background } })
              }
              aria-label="Foreground color hex"
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Background</Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() =>
                update({ colors: { foreground: settings.colors.background, background: settings.colors.foreground } })
              }
            >
              <ArrowLeftRight className="h-4 w-4" />
              Swap
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Input
              type="color"
              value={settings.colors.background}
              onChange={(event) => update({ colors: { background: event.target.value } })}
              aria-label="Background color"
            />
            <Input
              type="text"
              value={settings.colors.background}
              onChange={(event) => update({ colors: { background: event.target.value } })}
              aria-label="Background color hex"
            />
          </div>
        </div>
      </div>

      <div className="space-y-3 rounded-lg border border-ink/10 bg-white/70 p-4">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor={logoToggleId}>Logo overlay</Label>
            <p className="text-xs text-ink/60">Auto-scaled to a safe 20% size.</p>
          </div>
          <Switch
            id={logoToggleId}
            checked={settings.logo.enabled}
            onCheckedChange={(checked) =>
              update({ logo: { enabled: checked }, eccLevel: checked ? "Q" : settings.eccLevel })
            }
          />
        </div>

        <Label htmlFor={logoFileId} className="text-xs text-ink/60">
          Upload logo (PNG, JPG, SVG)
        </Label>
        <Input
          id={logoFileId}
          type="file"
          accept="image/png,image/jpeg,image/svg+xml"
          disabled={!settings.logo.enabled}
          onChange={(event) => handleLogoUpload(event.target.files?.[0])}
        />

        {logoError ? <p className="text-xs text-red-600">{logoError}</p> : null}

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor={logoSafeId}>Safe mode</Label>
            <p className="text-xs text-ink/60">Adds a white pad behind the logo.</p>
          </div>
          <Switch
            id={logoSafeId}
            checked={settings.logo.safeMode}
            disabled={!settings.logo.enabled}
            onCheckedChange={(checked) => update({ logo: { safeMode: checked } })}
          />
        </div>

        {settings.logo.enabled ? (
          <p className="text-xs text-ink/60">Logo enabled: error correction is set to Q for safety.</p>
        ) : null}

        {settings.logo.dataUrl ? (
          <Button type="button" variant="ghost" onClick={() => update({ logo: { enabled: false, dataUrl: undefined } })}>
            Remove logo
          </Button>
        ) : null}
      </div>
    </div>
  );
};
