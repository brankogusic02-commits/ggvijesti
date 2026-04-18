import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "rgb(var(--c-bg) / <alpha-value>)",
          soft: "rgb(var(--c-bg-soft) / <alpha-value>)",
          elev: "rgb(var(--c-bg-elev) / <alpha-value>)",
        },
        line: "rgb(var(--c-line) / <alpha-value>)",
        fg: {
          DEFAULT: "rgb(var(--c-fg) / <alpha-value>)",
          soft: "rgb(var(--c-fg-soft) / <alpha-value>)",
        },
        muted: "rgb(var(--c-muted) / <alpha-value>)",
        neon: {
          green: "rgb(var(--c-accent) / <alpha-value>)",
          purple: "rgb(var(--c-accent-2) / <alpha-value>)",
        },
      },
      fontFamily: {
        display: ["var(--font-orbitron)", "ui-sans-serif", "system-ui"],
        sans: ["var(--font-rajdhani)", "ui-sans-serif", "system-ui"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        neon: "0 0 24px rgb(var(--c-accent) / 0.25), 0 0 2px rgb(var(--c-accent) / 0.6)",
        "neon-purple":
          "0 0 24px rgb(var(--c-accent-2) / 0.25), 0 0 2px rgb(var(--c-accent-2) / 0.6)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
