import Link from "next/link";
import type { Category } from "@/lib/categories";

export function CategoryPill({
  category,
  asLink = true,
}: {
  category: Category;
  asLink?: boolean;
}) {
  const color =
    category.accent === "green"
      ? "border-neon-green/50 text-neon-green hover:bg-neon-green/10"
      : "border-neon-purple/50 text-neon-purple hover:bg-neon-purple/10";

  const classes = `inline-flex items-center rounded-full border bg-bg-soft/70 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.15em] transition ${color}`;

  if (!asLink) return <span className={classes}>{category.name}</span>;
  return (
    <Link href={`/category/${category.slug}/`} className={classes}>
      {category.name}
    </Link>
  );
}
