import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { CategorySlug } from "./categories";
import type { Post, PostFrontmatter } from "./post-types";

export type { Post, PostFrontmatter } from "./post-types";
export { formatDate } from "./post-types";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function readPostFile(filename: string): Post | null {
  if (!filename.endsWith(".md") && !filename.endsWith(".mdx")) return null;
  const slug = filename.replace(/\.(md|mdx)$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  const fm = data as PostFrontmatter;
  return {
    ...fm,
    tags: fm.tags ?? [],
    featured: fm.featured ?? false,
    slug,
    content,
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .map(readPostFile)
    .filter((p): p is Post => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getPostsByCategory(category: CategorySlug): Post[] {
  return getAllPosts().filter((p) => p.category === category);
}
