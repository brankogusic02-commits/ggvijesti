import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-bg-soft/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-10 md:flex-row md:justify-between">
        <div>
          <p className="font-display text-lg font-bold tracking-wider">
            GG<span className="text-neon-green">Vijesti</span>
          </p>
          <p className="mt-2 max-w-xs text-sm text-muted">
            Real world. Gaming mindset. Vijesti ispisane kao patch notes.
          </p>
        </div>

        <nav aria-label="Footer categories" className="grid grid-cols-2 gap-x-8 gap-y-2">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}/`}
              className="text-sm text-zinc-300 transition hover:text-neon-green"
            >
              {c.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto w-full max-w-6xl px-5 py-4 text-xs text-muted">
          © {new Date().getFullYear()} GGVijesti · ggvijesti.com
        </p>
      </div>
    </footer>
  );
}
