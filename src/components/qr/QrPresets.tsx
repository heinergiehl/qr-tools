"use client";

import { Sparkles } from "lucide-react";

import { applyPreset, isPresetMatch, qrPresets } from "@/lib/qr/presets";
import type { QrSettings } from "@/lib/qr/types";

export type QrPresetsProps = {
  settings: QrSettings;
  onChange: (settings: QrSettings) => void;
};

export const QrPresets = ({ settings, onChange }: QrPresetsProps) => (
  <div className="grid gap-3 md:grid-cols-3">
    {qrPresets.map((preset) => {
      const isActive = isPresetMatch(settings, preset);

      return (
        <button
          key={preset.id}
          type="button"
          aria-pressed={isActive}
          onClick={() => onChange(applyPreset(settings, preset))}
          className={`rounded-xl border p-4 text-left transition ${
            isActive
              ? "border-ink/60 bg-sand/80 shadow"
              : "border-ink/10 bg-white/80 hover:border-ink/30 hover:shadow"
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-ink">{preset.label}</p>
            {isActive ? <Sparkles className="h-4 w-4 text-ink/70" /> : null}
          </div>
          <p className="text-xs text-ink/60">{preset.description}</p>
        </button>
      );
    })}
  </div>
);
