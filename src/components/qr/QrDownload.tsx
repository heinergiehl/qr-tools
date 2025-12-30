"use client";

import { useMemo, useState } from "react";
import { PDFDocument } from "pdf-lib";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PAGE_SIZES = {
  A4: { width: 595.28, height: 841.89 },
  Letter: { width: 612, height: 792 },
};

const LABEL_LAYOUTS = {
  single: { label: "Single" },
  "grid-2x5": { label: "2 x 5 labels", cols: 2, rows: 5 },
  "grid-3x8": { label: "3 x 8 labels", cols: 3, rows: 8 },
} as const;

type LabelLayoutKey = keyof typeof LABEL_LAYOUTS;

type QrDownloadProps = {
  svgString?: string;
  pngDataUrl?: string;
  filename: string;
  onDownload?: (type: "png" | "svg" | "pdf") => void;
};

const toBlobUrl = (content: string, type: string) => {
  const blob = new Blob([content], { type });
  return URL.createObjectURL(blob);
};

const triggerDownload = (url: string, filename: string) => {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const dataUrlToBytes = async (dataUrl: string) => {
  const response = await fetch(dataUrl);
  return new Uint8Array(await response.arrayBuffer());
};

const renderPdf = async (
  pngDataUrl: string,
  pageSize: keyof typeof PAGE_SIZES,
  layout: LabelLayoutKey
) => {
  const pdf = await PDFDocument.create();
  const { width, height } = PAGE_SIZES[pageSize];
  const page = pdf.addPage([width, height]);
  const pngBytes = await dataUrlToBytes(pngDataUrl);
  const image = await pdf.embedPng(pngBytes);

  if (layout === "single") {
    const margin = 48;
    const maxSize = Math.min(width - margin * 2, height - margin * 2);
    const size = Math.min(maxSize, image.width, image.height);
    const x = (width - size) / 2;
    const y = (height - size) / 2;
    page.drawImage(image, { x, y, width: size, height: size });
  } else {
    const { cols, rows } = LABEL_LAYOUTS[layout];
    const cellWidth = width / cols;
    const cellHeight = height / rows;
    const qrSize = Math.min(cellWidth, cellHeight) * 0.75;

    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const x = col * cellWidth + (cellWidth - qrSize) / 2;
        const y = height - (row + 1) * cellHeight + (cellHeight - qrSize) / 2;
        page.drawImage(image, { x, y, width: qrSize, height: qrSize });
      }
    }
  }

  return pdf.save();
};

export const QrDownload = ({ svgString, pngDataUrl, filename, onDownload }: QrDownloadProps) => {
  const [pageSize, setPageSize] = useState<keyof typeof PAGE_SIZES>("A4");
  const [layout, setLayout] = useState<LabelLayoutKey>("single");

  const pdfDisabled = !pngDataUrl;
  const pngDisabled = !pngDataUrl;
  const svgDisabled = !svgString;

  const pdfLabel = useMemo(
    () => (layout === "single" ? `PDF ${pageSize}` : `PDF ${pageSize} (${LABEL_LAYOUTS[layout].label})`),
    [layout, pageSize]
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-ink/50">PDF Size</p>
          <Select value={pageSize} onValueChange={(value) => setPageSize(value as keyof typeof PAGE_SIZES)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(PAGE_SIZES).map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-ink/50">Label Layout</p>
          <Select value={layout} onValueChange={(value) => setLayout(value as LabelLayoutKey)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(LABEL_LAYOUTS).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        <Button
          type="button"
          variant="default"
          disabled={pngDisabled}
          onClick={() => {
            if (!pngDataUrl) return;
            const link = document.createElement("a");
            link.href = pngDataUrl;
            link.download = `${filename}.png`;
            link.click();
            onDownload?.("png");
          }}
        >
          Download PNG
        </Button>
        <Button
          type="button"
          variant="secondary"
          disabled={svgDisabled}
          onClick={() => {
            if (!svgString) return;
            const url = toBlobUrl(svgString, "image/svg+xml;charset=utf-8");
            triggerDownload(url, `${filename}.svg`);
            onDownload?.("svg");
          }}
        >
          Download SVG
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={pdfDisabled}
          onClick={async () => {
            if (!pngDataUrl) return;
            const pdfBytes = await renderPdf(pngDataUrl, pageSize, layout);
            const url = URL.createObjectURL(new Blob([pdfBytes], { type: "application/pdf" }));
            triggerDownload(url, `${filename}-${layout}-${pageSize}.pdf`);
            onDownload?.("pdf");
          }}
        >
          {pdfLabel}
        </Button>
      </div>
    </div>
  );
};
