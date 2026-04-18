import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CATEGORIES, getCategory } from "@/lib/categories";
import { getPostsByCategory } from "@/lib/posts";
import { ArticleCard } from "@/components/ArticleCard";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { category: string };
}): Metadata {
  const cat = getCategory(params.category);
  if (!cat) return {};
  return {
    title: cat.name,
    description: cat.blurb,
  };
}

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const cat = getCategory(params.category);
  if (!cat) notFound();
  const posts = getPostsByCategory(cat.slug);

  return (
    <section className="mx-auto w-full max-w-6xl px-5 pb-20 pt-10 md:pt-14">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-neon-green"
      >
        <span aria-hidden>←</span> All categories
      </Link>

      <header className="mt-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-neon-green">
          Category
        </p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl">
          {cat.name}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-zinc-300">{cat.blurb}</p>
      </header>

      {posts.length === 0 ? (
        <p className="mt-16 text-center text-muted">
          Nema postova u ovoj kategoriji. Lobby prazan.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <ArticleCard key={p.slug} post={p} />
          ))}
        </div>
      )}
    </section>
  );
}
