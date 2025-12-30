"use client";

import { useEffect } from "react";

import { logEvent } from "@/lib/analytics";
import { qrTools } from "@/lib/qr/tools";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QrTool } from "./QrTool";

const defaultTool = "url";

export const QrToolTabs = () => {
  useEffect(() => {
    logEvent("generator_type_selected", { tool: defaultTool });
  }, []);

  return (
    <Tabs
      defaultValue={defaultTool}
      className="space-y-8"
      onValueChange={(value) => logEvent("generator_type_selected", { tool: value })}
    >
      <TabsList className="flex flex-wrap">
        {qrTools.map((tool) => (
          <TabsTrigger key={tool.id} value={tool.id}>
            {tool.title.replace("QR Code Generator", "").trim() || "QR"}
          </TabsTrigger>
        ))}
      </TabsList>
      {qrTools.map((tool) => (
        <TabsContent key={tool.id} value={tool.id}>
          <QrTool
            config={tool}
            onCopy={() => logEvent("copy_payload", { tool: tool.id })}
            onDownload={(type) => logEvent(`download_${type}`, { tool: tool.id })}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
};
