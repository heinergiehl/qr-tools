"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { logEvent } from "@/lib/analytics";

export const PageViewTracker = () => {
  const pathname = usePathname();

  useEffect(() => {
    logEvent("page_view", { path: pathname ?? "/" });
  }, [pathname]);

  return null;
};
