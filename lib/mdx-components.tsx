import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-10 scroll-mt-24 font-display text-2xl font-bold tracking-wide text-neon-green"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-8 font-display text-xl font-semibold text-neon-purple"
      {...props}
    />
  ),
  a: (props) => (
    <a
      className="text-neon-green underline decoration-neon-green/40 underline-offset-4 transition hover:decoration-neon-green"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noreferrer" : undefined}
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="my-6 border-l-2 border-neon-purple/60 bg-bg-soft px-5 py-3 italic text-fg-soft"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded bg-bg-elev px-1.5 py-0.5 font-mono text-sm text-neon-green"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-line" />,
};
