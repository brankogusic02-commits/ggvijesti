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
          DEFAULT: "#0a0a0f",
          soft: "#111118",
          elev: "#16161f",
        },
        neon: {
          green: "#39ff9c",
          purple: "#b47bff",
        },
        line: "#22222c",
        muted: "#8b8b9a",
      },
      fontFamily: {
        display: ["var(--font-orbitron)", "ui-sans-serif", "system-ui"],
        sans: ["var(--font-rajdhani)", "ui-sans-serif", "system-ui"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        neon: "0 0 24px rgba(57,255,156,0.25), 0 0 2px rgba(57,255,156,0.6)",
        "neon-purple": "0 0 24px rgba(180,123,255,0.25), 0 0 2px rgba(180,123,255,0.6)",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
