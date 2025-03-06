"use client";

import { useEffect, RefObject } from "react";

export const useHeaderShadowOnScroll = (
  headerRef: RefObject<HTMLDivElement | null>
): void => {
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollpos = window.scrollY;

      if (currentScrollpos === 0) {
        headerRef.current!.style.boxShadow = "none";
      } else {
        headerRef.current!.style.boxShadow = "0 4px 4px rgba(30, 10, 58, 0.15)";
      }
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [headerRef]);
};
