import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col items-center px-5 py-24 text-center">
      <p className="font-mono text-sm uppercase tracking-[0.25em] text-neon-purple">
        Error 404
      </p>
      <h1 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">
        You fell out of the map.
      </h1>
      <p className="mt-4 max-w-lg text-lg text-zinc-300">
        Ova stranica je despawnala. Respawn na homepage i pokusaj ponovo.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-neon-green bg-neon-green/10 px-6 py-3 font-display text-sm font-semibold uppercase tracking-wider text-neon-green shadow-neon transition hover:bg-neon-green/20"
      >
        Return to lobby
      </Link>
    </section>
  );
}
