"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type CopyStatus = "idle" | "copied" | "error";

export function useCopyToClipboard(resetMs = 2000) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const copy = useCallback(
    async (value: string) => {
      if (!value) {
        return false;
      }

      try {
        await navigator.clipboard.writeText(value);
        setStatus("copied");
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => setStatus("idle"), resetMs);
        return true;
      } catch {
        setStatus("error");
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => setStatus("idle"), resetMs);
        return false;
      }
    },
    [resetMs],
  );

  return { status, copy };
}
