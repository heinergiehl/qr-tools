"use client";

import { useEffect } from "react";

import { logEvent } from "@/lib/analytics";
import { getQrTool } from "@/lib/qr/tools";

import { QrTool } from "./QrTool";

export const QrToolClient = ({ toolId }: { toolId: string }) => {
  const config = getQrTool(toolId);

  useEffect(() => {
    logEvent("generator_type_selected", { tool: toolId });
  }, [toolId]);

  if (!config) {
    return <p className="text-sm text-ink/60">Tool not found.</p>;
  }

  return (
    <QrTool
      config={config}
      onCopy={() => logEvent("copy_payload", { tool: toolId })}
      onDownload={(type) => logEvent(`download_${type}`, { tool: toolId })}
    />
  );
};
