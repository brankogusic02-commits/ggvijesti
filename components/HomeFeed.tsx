"use client";

import { useMemo, useState } from "react";
import type { Post } from "@/lib/post-types";
import type { Category } from "@/lib/categories";
import { ArticleCard } from "./ArticleCard";
import { CategoryFilter, type FilterValue } from "./CategoryFilter";

export function HomeFeed({
  posts,
  categories,
}: {
  posts: Post[];
  categories: Category[];
}) {
  const [filter, setFilter] = useState<FilterValue>("all");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const p of posts) c[p.category] = (c[p.category] ?? 0) + 1;
    return c;
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (filter !== "all" && p.category !== filter) return false;
      if (!q) return true;
      const hay = `${p.title} ${p.excerpt} ${(p.tags ?? []).join(" ")}`.toLowerCase();
      return hay.includes(q);
    });
  }, [posts, filter, query]);

  return (
    <section className="mx-auto w-full max-w-6xl px-5 pb-20">
      <div className="flex flex-col gap-5 border-b border-line pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-neon-green">
            Latest drops
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Patch notes from the real world
          </h2>
        </div>

        <label className="relative block w-full max-w-sm">
          <span className="sr-only">Search articles</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the lobby…"
            className="w-full rounded-full border border-line bg-bg-soft px-4 py-2.5 pl-10 text-sm text-zinc-100 placeholder:text-muted focus:border-neon-green focus:outline-none focus:ring-2 focus:ring-neon-green/30"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
          >
            ⌕
          </span>
        </label>
      </div>

      <div className="mt-6">
        <CategoryFilter
          categories={categories}
          value={filter}
          onChange={setFilter}
          counts={counts}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="mt-20 rounded-2xl border border-dashed border-line bg-bg-soft/40 py-16 text-center">
          <p className="font-display text-xl text-zinc-200">No matches.</p>
          <p className="mt-2 text-sm text-muted">
            Lobby je prazan — probaj drugu kategoriju ili brisi search.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <ArticleCard
              key={p.slug}
              post={p}
              featured={filter === "all" && !query && i === 0 && p.featured}
            />
          ))}
        </div>
      )}
    </section>
  );
}
