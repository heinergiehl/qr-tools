import * as React from "react";

import { cn } from "@/lib/utils";

const Badge = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full border border-ink/10 bg-white px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-ink/70",
      className
    )}
    {...props}
  />
);

export { Badge };
