import { cn } from "@/lib/utils";

export const AdSlot = ({ className, label = "Ad" }: { className?: string; label?: string }) => (
  <div
    className={cn(
      "flex min-h-[180px] items-center justify-center rounded-xl border border-dashed border-ink/20 bg-white/60 text-xs font-semibold uppercase tracking-[0.3em] text-ink/40",
      className
    )}
    aria-label="Advertisement"
  >
    {label}
  </div>
);
