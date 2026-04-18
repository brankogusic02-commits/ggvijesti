import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug, formatDate } from "@/lib/posts";
import { getCategory } from "@/lib/categories";
import { mdxComponents } from "@/lib/mdx-components";
import { CategoryPill } from "@/components/CategoryPill";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: [post.coverImage],
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();
  const cat = getCategory(post.category);

  return (
    <article className="mx-auto w-full max-w-3xl px-5 pb-24 pt-10 md:pt-14">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted transition hover:text-neon-green"
      >
        <span aria-hidden>←</span> Back to feed
      </Link>

      <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
        {cat && <CategoryPill category={cat} />}
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden>·</span>
        <span>{post.readingMinutes} min read</span>
        <span aria-hidden>·</span>
        <span className="text-zinc-300 dark:text-zinc-300">by {post.author}</span>
      </div>

      <h1 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-zinc-50 md:text-5xl">
        {post.title}
      </h1>
      <p className="mt-4 text-lg text-zinc-300 md:text-xl">{post.excerpt}</p>

      <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-line bg-bg-soft">
        <Image
          src={post.coverImage}
          alt=""
          fill
          sizes="(min-width: 768px) 768px, 100vw"
          className="object-cover"
          priority
        />
      </div>

      <div className="prose prose-invert mt-10 max-w-none prose-headings:font-display prose-p:text-zinc-200 prose-p:leading-relaxed prose-strong:text-zinc-50 prose-li:text-zinc-200">
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>

      {post.tags && post.tags.length > 0 && (
        <div className="mt-12 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-line bg-bg-soft px-3 py-1 text-xs uppercase tracking-wider text-muted"
            >
              #{t}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
