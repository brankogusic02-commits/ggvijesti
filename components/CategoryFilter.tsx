"use client";

import type { Category, CategorySlug } from "@/lib/categories";

export type FilterValue = CategorySlug | "all";

export function CategoryFilter({
  categories,
  value,
  onChange,
  counts,
}: {
  categories: Category[];
  value: FilterValue;
  onChange: (v: FilterValue) => void;
  counts: Record<string, number>;
}) {
  const allCount = Object.values(counts).reduce((a, b) => a + b, 0);

  const items: { slug: FilterValue; name: string; count: number }[] = [
    { slug: "all", name: "All drops", count: allCount },
    ...categories.map((c) => ({
      slug: c.slug,
      name: c.name,
      count: counts[c.slug] ?? 0,
    })),
  ];

  return (
    <div
      role="tablist"
      aria-label="Filter by category"
      className="flex flex-wrap gap-2"
    >
      {items.map((it) => {
        const active = it.slug === value;
        return (
          <button
            key={it.slug}
            role="tab"
            aria-selected={active}
            type="button"
            onClick={() => onChange(it.slug)}
            className={[
              "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.15em] transition",
              active
                ? "border-neon-green bg-neon-green/10 text-neon-green shadow-neon"
                : "border-line bg-bg-soft text-zinc-300 hover:border-neon-green/50 hover:text-neon-green",
            ].join(" ")}
          >
            <span>{it.name}</span>
            <span
              className={[
                "rounded-full px-1.5 py-0.5 text-[10px] tabular-nums",
                active ? "bg-neon-green/20 text-neon-green" : "bg-bg text-muted",
              ].join(" ")}
            >
              {it.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
