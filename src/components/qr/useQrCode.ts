"use client";

import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";

import type { QrSettings } from "@/lib/qr/types";
import { svgToDataUrl } from "@/lib/qr/logo";

const LOGO_SCALE = 0.2;

const applyLogoToSvg = (
  svgString: string,
  size: number,
  logoDataUrl?: string,
  safeMode?: boolean
) => {
  if (!logoDataUrl) {
    return svgString;
  }
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, "image/svg+xml");
  const svg = doc.documentElement;
  svg.setAttribute("width", String(size));
  svg.setAttribute("height", String(size));

  const logoSize = Math.round(size * LOGO_SCALE);
  const offset = Math.round((size - logoSize) / 2);

  if (safeMode) {
    const rect = doc.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", String(offset - logoSize * 0.08));
    rect.setAttribute("y", String(offset - logoSize * 0.08));
    rect.setAttribute("width", String(logoSize + logoSize * 0.16));
    rect.setAttribute("height", String(logoSize + logoSize * 0.16));
    rect.setAttribute("rx", "6");
    rect.setAttribute("fill", "#ffffff");
    svg.appendChild(rect);
  }

  const image = doc.createElementNS("http://www.w3.org/2000/svg", "image");
  image.setAttribute("href", logoDataUrl);
  image.setAttribute("x", String(offset));
  image.setAttribute("y", String(offset));
  image.setAttribute("width", String(logoSize));
  image.setAttribute("height", String(logoSize));
  image.setAttribute("preserveAspectRatio", "xMidYMid meet");
  svg.appendChild(image);

  return new XMLSerializer().serializeToString(svg);
};

const svgToPngDataUrl = (svgString: string, size: number, background: string) =>
  new Promise<string>((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const context = canvas.getContext("2d");
      if (!context) {
        reject(new Error("Canvas context not available"));
        return;
      }
      context.fillStyle = background;
      context.fillRect(0, 0, size, size);
      context.drawImage(img, 0, 0, size, size);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => reject(new Error("Failed to load SVG"));
    img.src = svgToDataUrl(svgString);
  });

export type QrRenderState = {
  svgString?: string;
  pngDataUrl?: string;
  isLoading: boolean;
  error?: string;
};

export const useQrCode = (payload: string, settings: QrSettings) => {
  const [state, setState] = useState<QrRenderState>({ isLoading: false });

  const effectiveEccLevel = useMemo(() => {
    if (settings.logo.enabled && settings.logo.dataUrl) {
      return "Q";
    }
    return settings.eccLevel;
  }, [settings.eccLevel, settings.logo.enabled, settings.logo.dataUrl]);

  useEffect(() => {
    let cancelled = false;
    if (!payload) {
      setState({ isLoading: false, svgString: undefined, pngDataUrl: undefined });
      return;
    }

    const renderQr = async () => {
      setState((prev) => ({ ...prev, isLoading: true, error: undefined }));
      try {
        const svgString = await QRCode.toString(payload, {
          type: "svg",
          margin: settings.margin,
          width: settings.size,
          errorCorrectionLevel: effectiveEccLevel,
          color: {
            dark: settings.colors.foreground,
            light: settings.colors.background,
          },
        });
        const finalSvg = applyLogoToSvg(
          svgString,
          settings.size,
          settings.logo.enabled ? settings.logo.dataUrl : undefined,
          settings.logo.safeMode
        );
        const pngDataUrl = await svgToPngDataUrl(finalSvg, settings.size, settings.colors.background);

        if (!cancelled) {
          setState({ isLoading: false, svgString: finalSvg, pngDataUrl });
        }
      } catch (error) {
        if (!cancelled) {
          setState({
            isLoading: false,
            error: error instanceof Error ? error.message : "Unable to generate QR code.",
          });
        }
      }
    };

    renderQr();

    return () => {
      cancelled = true;
    };
  }, [payload, settings, effectiveEccLevel]);

  return { ...state, effectiveEccLevel };
};
