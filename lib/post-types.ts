import type { CategorySlug } from "./categories";

export interface PostFrontmatter {
  title: string;
  date: string;
  category: CategorySlug;
  tags?: string[];
  author: string;
  excerpt: string;
  coverImage: string;
  featured?: boolean;
}

export interface Post extends PostFrontmatter {
  slug: string;
  content: string;
  readingMinutes: number;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("hr-HR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
