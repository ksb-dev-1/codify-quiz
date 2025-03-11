"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";

export default function ProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.start(); // Start progress bar when route changes
    const timer = setTimeout(() => NProgress.done(), 500); // Stop progress bar after short delay

    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [pathname, searchParams]); // Runs when URL changes

  return null; // No visible UI component needed
}
