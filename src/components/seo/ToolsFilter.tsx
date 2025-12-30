"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import type { ToolMeta } from "@/lib/seo/tools";

export const ToolsFilter = ({ tools }: { tools: ToolMeta[] }) => {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return tools;
    return tools.filter((tool) =>
      [tool.title, tool.description, tool.slug].some((value) => value.toLowerCase().includes(normalized))
    );
  }, [query, tools]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/50">Filter tools</p>
          <p className="text-sm text-ink/70">{filtered.length} tools available</p>
        </div>
        <Input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search URL, WiFi, vCard..."
          className="h-9 w-full max-w-xs"
          aria-label="Search tools"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.length ? (
          filtered.map((tool) => (
            <Link
              key={tool.slug}
              href={tool.route}
              className="group rounded-2xl border border-ink/10 bg-white/70 p-6 transition hover:border-ink/30 hover:shadow"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-ink group-hover:text-ink/90">{tool.title}</h2>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/40">Open</span>
              </div>
              <p className="mt-2 text-sm text-ink/70">{tool.description}</p>
            </Link>
          ))
        ) : (
          <div className="rounded-2xl border border-ink/10 bg-white/70 p-6 text-sm text-ink/70">
            No tools match that search yet. Try “URL” or “WiFi”.
          </div>
        )}
      </div>
    </div>
  );
};
