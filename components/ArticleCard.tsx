import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/lib/post-types";
import { formatDate } from "@/lib/post-types";
import { getCategory } from "@/lib/categories";
import { CategoryPill } from "./CategoryPill";

export function ArticleCard({
  post,
  featured = false,
}: {
  post: Post;
  featured?: boolean;
}) {
  const cat = getCategory(post.category);

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-bg-soft transition-all duration-300 hover:-translate-y-1 hover:border-neon-green/60 hover:shadow-neon ${
        featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      <Link
        href={`/posts/${post.slug}/`}
        className="flex h-full flex-col"
        aria-label={post.title}
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-bg-elev">
          <Image
            src={post.coverImage}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-soft via-bg-soft/20 to-transparent" />
          {post.featured && (
            <span className="absolute left-3 top-3 rounded-full border border-neon-purple/60 bg-bg/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-neon-purple">
              ★ Featured
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
            {cat && <CategoryPill category={cat} asLink={false} />}
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span>{post.readingMinutes} min</span>
          </div>

          <h3
            className={`font-display font-bold leading-tight tracking-tight text-fg transition-colors group-hover:text-neon-green ${
              featured ? "text-2xl md:text-3xl" : "text-lg"
            }`}
          >
            {post.title}
          </h3>
          <p className="line-clamp-3 text-sm text-fg-soft">{post.excerpt}</p>

          <div className="mt-auto pt-2 text-xs text-muted">by {post.author}</div>
        </div>
      </Link>
    </article>
  );
}
