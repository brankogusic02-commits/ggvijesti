export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="absolute inset-0 grid-bg opacity-60" aria-hidden />
      <div
        aria-hidden
        className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-neon-green/20 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-neon-purple/20 blur-3xl"
      />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-20 md:py-28">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-neon-green/50 bg-bg-soft/60 px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-neon-green">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon-green" />
          Live patch — v{new Date().getFullYear()}
        </span>

        <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-fg md:text-6xl lg:text-7xl">
          GG<span className="text-neon-green">Vijesti</span>
          <span className="block text-fg-soft">Real world.</span>
          <span className="block text-neon-purple">Gaming mindset.</span>
        </h1>

        <p className="max-w-2xl text-lg text-fg-soft md:text-xl">
          Svijet kao open-world. Vijesti kao patch notes. Pratimo domace i svjetske
          eventove iz gamer perspektive — bez stream-sniping, samo cista dostava.
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href="#latest"
            className="inline-flex items-center gap-2 rounded-full border border-neon-green bg-neon-green/10 px-5 py-2.5 font-display text-sm font-semibold uppercase tracking-wider text-neon-green shadow-neon transition hover:bg-neon-green/20"
          >
            Enter the feed ▸
          </a>
          <a
            href="/category/hr-server/"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-bg-soft px-5 py-2.5 font-display text-sm font-semibold uppercase tracking-wider text-fg transition hover:border-neon-purple/60 hover:text-neon-purple"
          >
            HR server ▸
          </a>
        </div>
      </div>
      <div id="latest" />
    </section>
  );
}
