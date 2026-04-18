"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme !== "light";
  const next = isDark ? "light" : "dark";

  return (
    <button
      type="button"
      aria-label={`Switch to ${next} mode`}
      onClick={() => setTheme(next)}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-bg-soft text-fg-soft transition hover:border-neon-green hover:text-neon-green"
    >
      <span aria-hidden className="text-base">
        {mounted ? (isDark ? "◐" : "◑") : "◐"}
      </span>
    </button>
  );
}
