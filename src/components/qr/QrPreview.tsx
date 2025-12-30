"use client";

import { useMemo } from "react";
import { AlertTriangle, Copy, RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { QrDownload } from "@/components/qr/QrDownload";
import { getContrastRatio, isLowContrast } from "@/lib/qr/contrast";
import type { QrSettings } from "@/lib/qr/types";

import { useQrCode } from "./useQrCode";

export type QrPreviewProps = {
  payload: string;
  settings: QrSettings;
  fileName: string;
  onCopy?: () => void;
  onDownload?: (type: "png" | "svg" | "pdf") => void;
};

export const QrPreview = ({ payload, settings, fileName, onCopy, onDownload }: QrPreviewProps) => {
  const { svgString, pngDataUrl, isLoading, error, effectiveEccLevel } = useQrCode(payload, settings);
  const contrastRatio = useMemo(
    () => getContrastRatio(settings.colors.foreground, settings.colors.background),
    [settings.colors.foreground, settings.colors.background]
  );
  const payloadLength = payload.length;
  const payloadPreview = payloadLength > 200 ? `${payload.slice(0, 200)}…` : payload;
  const scanQuality = useMemo(() => {
    if (!payload) {
      return { score: 0, label: "Waiting for data", bar: "bg-ink/20", text: "text-ink/60" };
    }

    let score = 100;
    if (contrastRatio < 3) score -= 40;
    else if (contrastRatio < 4.5) score -= 20;
    if (settings.margin < 4) score -= 15;
    if (settings.size < 320) score -= 15;
    if (settings.logo.enabled) score -= 10;

    const finalScore = Math.max(0, Math.min(100, score));
    if (finalScore >= 80) return { score: finalScore, label: "Excellent", bar: "bg-emerald-500", text: "text-emerald-700" };
    if (finalScore >= 60) return { score: finalScore, label: "Good", bar: "bg-lime-500", text: "text-lime-700" };
    if (finalScore >= 40) return { score: finalScore, label: "Fair", bar: "bg-amber-500", text: "text-amber-700" };
    return { score: finalScore, label: "Risky", bar: "bg-rose-500", text: "text-rose-700" };
  }, [contrastRatio, payload, settings.logo.enabled, settings.margin, settings.size]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-ink/10 bg-white/80 p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/50">Preview</p>
            <p className="text-sm text-ink/70">Static QR codes never expire.</p>
          </div>
          <Button
            type="button"
            variant="ghost"
            disabled={!payload}
            onClick={async () => {
              await navigator.clipboard.writeText(payload);
              onCopy?.();
            }}
          >
            <Copy className="h-4 w-4" />
            Copy payload
          </Button>
        </div>

        <div
          className="mt-6 flex items-center justify-center rounded-xl border border-dashed border-ink/10 bg-sand/60 p-6"
          aria-live="polite"
        >
          {isLoading ? (
            <div className="flex items-center gap-2 text-sm text-ink/60">
              <RefreshCcw className="h-4 w-4 animate-spin" />
              Rendering QR...
            </div>
          ) : error ? (
            <p className="text-sm text-red-600">{error}</p>
          ) : svgString ? (
            <div
              className="w-full max-w-[320px] overflow-hidden [&>svg]:block [&>svg]:h-auto [&>svg]:w-full"
              dangerouslySetInnerHTML={{ __html: svgString }}
            />
          ) : (
            <p className="text-sm text-ink/60">Enter details to generate a QR code.</p>
          )}
        </div>

        {payload ? (
          <div className="mt-4 rounded-xl border border-ink/10 bg-white/70 p-4 text-xs text-ink/70">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-ink/50">Payload preview</p>
            <pre className="mt-2 whitespace-pre-wrap">{payloadPreview}</pre>
          </div>
        ) : null}

        <div className="mt-5 space-y-2 text-xs text-ink/60">
          <p>Effective error correction: {effectiveEccLevel}</p>
          {isLowContrast(settings.colors.foreground, settings.colors.background) ? (
            <p className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-4 w-4" />
              Warning: low contrast (ratio {contrastRatio.toFixed(2)}). Increase contrast for better scans.
            </p>
          ) : (
            <p>Contrast ratio: {contrastRatio.toFixed(2)}</p>
          )}
          {payload ? <p>Payload length: {payloadLength} characters</p> : null}
        </div>
      </div>

      <div className="rounded-2xl border border-ink/10 bg-white/80 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/50">Scan quality</p>
            <p className={`text-sm font-semibold ${scanQuality.text}`}>{scanQuality.label}</p>
          </div>
          <p className="text-xs text-ink/60">Score {scanQuality.score}/100</p>
        </div>
        <div className="mt-4 h-2 w-full rounded-full bg-ink/10">
          <div className={`h-2 rounded-full ${scanQuality.bar}`} style={{ width: `${scanQuality.score}%` }} />
        </div>
        <p className="mt-3 text-xs text-ink/60">
          Based on contrast, margin, size, and logo usage. Use the presets to boost scan reliability.
        </p>
      </div>

      <div className="rounded-2xl border border-ink/10 bg-white/80 p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/50">Download</p>
        <div className="mt-4">
          <QrDownload svgString={svgString} pngDataUrl={pngDataUrl} filename={fileName} onDownload={onDownload} />
        </div>
        <p className="mt-3 text-xs text-ink/60">Downloads are generated locally in your browser.</p>
      </div>
    </div>
  );
};
