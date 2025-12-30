"use client";

import { type InputHTMLAttributes, useEffect, useMemo, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodSchema } from "zod";
import { Controller, type FieldValues, useForm } from "react-hook-form";

import { QrCustomizer } from "@/components/qr/QrCustomizer";
import { QrPresets } from "@/components/qr/QrPresets";
import { QrPreview } from "@/components/qr/QrPreview";
import { QrScanTest } from "@/components/qr/QrScanTest";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { logEvent } from "@/lib/analytics";
import { defaultQrSettings } from "@/lib/qr/presets";
import type { QrSettings } from "@/lib/qr/types";

export type FieldOption = { label: string; value: string };

export type FieldConfig = {
  name: string;
  label: string;
  type: "text" | "textarea" | "select" | "switch";
  placeholder?: string;
  description?: string;
  options?: FieldOption[];
  inputType?: InputHTMLAttributes<HTMLInputElement>["type"];
  inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
};

export type QrToolConfig<T extends FieldValues> = {
  id: string;
  title: string;
  description: string;
  schema: ZodSchema<T>;
  defaultValues: T;
  fields: FieldConfig[];
  buildPayload: (data: T) => string;
  preview?: (data: T) => React.ReactNode;
  warning?: (data: T) => string | undefined;
  scanTips: string[];
};

type QrToolProps<T extends FieldValues> = {
  config: QrToolConfig<T>;
  onDownload?: (type: "png" | "svg" | "pdf") => void;
  onCopy?: () => void;
};

export const QrTool = <T extends FieldValues>({ config, onDownload, onCopy }: QrToolProps<T>) => {
  const [settings, setSettings] = useState<QrSettings>(defaultQrSettings);
  const [payload, setPayload] = useState<string>("");
  const [lastValidData, setLastValidData] = useState<T | null>(null);

  const {
    control,
    register,
    watch,
    getValues,
    formState: { errors, isValid },
  } = useForm<T>({
    resolver: zodResolver(config.schema),
    defaultValues: config.defaultValues,
    mode: "onChange",
  });

  const warning = useMemo(
    () => (lastValidData ? config.warning?.(lastValidData) : undefined),
    [config, lastValidData]
  );
  const previousSettings = useRef(settings);

  useEffect(() => {
    const prev = previousSettings.current;
    if (prev.logo.enabled !== settings.logo.enabled) {
      logEvent("logo_enabled", { tool: config.id, enabled: settings.logo.enabled ? "true" : "false" });
    }
    if (prev.eccLevel !== settings.eccLevel) {
      logEvent("error_correction_changed", { tool: config.id, level: settings.eccLevel });
    }
    previousSettings.current = settings;
  }, [config.id, settings]);

  useEffect(() => {
    const updateFromValues = (values: unknown) => {
      const parsed = config.schema.safeParse(values);
      if (parsed.success) {
        setLastValidData(parsed.data);
        setPayload(config.buildPayload(parsed.data));
      } else {
        setPayload("");
      }
    };

    updateFromValues(getValues());
    const subscription = watch((value) => updateFromValues(value));

    return () => subscription.unsubscribe();
  }, [config, getValues, watch]);

  return (
    <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-8">
        <div className="space-y-3">
          <Badge>{config.id.toUpperCase()}</Badge>
          <h1 className="text-3xl font-semibold text-ink md:text-4xl">{config.title}</h1>
          <p className="max-w-2xl text-base text-ink/70">{config.description}</p>
        </div>

        <div className="space-y-6 rounded-2xl border border-ink/10 bg-white/80 p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/50">Generator</p>
          <p className="text-xs text-ink/60">Your inputs stay in this browser tab.</p>
          <div className="grid gap-5">
            {config.fields.map((field) => {
              const errorMessage = errors[field.name]?.message as string | undefined;
              const id = `${config.id}-${field.name}`;

              if (field.type === "select") {
                return (
                  <div key={field.name} className="space-y-2">
                    <Label htmlFor={id}>{field.label}</Label>
                    <Controller
                      control={control}
                      name={field.name as never}
                      render={({ field: controllerField }) => (
                        <Select value={controllerField.value as string} onValueChange={controllerField.onChange}>
                          <SelectTrigger id={id}>
                            <SelectValue placeholder={field.placeholder} />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options?.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {field.description ? <p className="text-xs text-ink/60">{field.description}</p> : null}
                    {errorMessage ? <p className="text-xs text-red-600">{errorMessage}</p> : null}
                  </div>
                );
              }

              if (field.type === "switch") {
                return (
                  <div key={field.name} className="flex items-center justify-between gap-4 rounded-xl border border-ink/10 bg-sand/60 p-4">
                    <div>
                      <Label htmlFor={id}>{field.label}</Label>
                      {field.description ? <p className="text-xs text-ink/60">{field.description}</p> : null}
                    </div>
                    <Controller
                      control={control}
                      name={field.name as never}
                      render={({ field: controllerField }) => (
                        <Switch id={id} checked={Boolean(controllerField.value)} onCheckedChange={controllerField.onChange} />
                      )}
                    />
                  </div>
                );
              }

              if (field.type === "textarea") {
                return (
                  <div key={field.name} className="space-y-2">
                    <Label htmlFor={id}>{field.label}</Label>
                    <Textarea id={id} placeholder={field.placeholder} {...register(field.name as never)} />
                    {field.description ? <p className="text-xs text-ink/60">{field.description}</p> : null}
                    {errorMessage ? <p className="text-xs text-red-600">{errorMessage}</p> : null}
                  </div>
                );
              }

              return (
                <div key={field.name} className="space-y-2">
                  <Label htmlFor={id}>{field.label}</Label>
                  <Input
                    id={id}
                    type={field.inputType ?? "text"}
                    placeholder={field.placeholder}
                    inputMode={field.inputMode}
                    autoComplete={field.autoComplete}
                    {...register(field.name as never)}
                  />
                  {field.description ? <p className="text-xs text-ink/60">{field.description}</p> : null}
                  {errorMessage ? <p className="text-xs text-red-600">{errorMessage}</p> : null}
                </div>
              );
            })}
          </div>

          {warning ? (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">{warning}</div>
          ) : null}

          {lastValidData && config.preview ? (
            <div className="rounded-lg border border-ink/10 bg-white p-4 text-xs text-ink/70">
              {config.preview(lastValidData)}
            </div>
          ) : null}

          {!isValid ? (
            <p className="text-xs text-ink/60">Fill the required fields to generate your QR.</p>
          ) : null}
        </div>

        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/50">Presets</p>
          <QrPresets settings={settings} onChange={setSettings} />
        </div>

        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/50">Customize</p>
          <QrCustomizer settings={settings} onChange={setSettings} />
        </div>

        <QrScanTest tips={config.scanTips} />
      </div>

      <div className="lg:sticky lg:top-24 lg:h-fit">
        <QrPreview
          payload={payload}
          settings={settings}
          fileName={config.id}
          onCopy={onCopy}
          onDownload={onDownload}
        />
      </div>
    </section>
  );
};
