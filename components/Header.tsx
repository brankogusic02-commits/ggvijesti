import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { CATEGORIES } from "@/lib/categories";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5">
        <Link
          href="/"
          className="group flex items-center gap-2"
          aria-label="GGVijesti home"
        >
          <LogoMark />
          <span className="font-display text-xl font-bold tracking-wider text-zinc-50 glitch-hover">
            GG<span className="text-neon-green">Vijesti</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Categories">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}/`}
              className="rounded-full px-3 py-1.5 text-sm text-zinc-300 transition hover:bg-bg-soft hover:text-neon-green"
            >
              {c.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

function LogoMark() {
  return (
    <span
      aria-hidden
      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-neon-green/60 bg-bg-soft font-display text-xs font-bold text-neon-green shadow-neon"
    >
      GG
    </span>
  );
}
