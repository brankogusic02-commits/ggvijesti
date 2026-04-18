export type CategorySlug =
  | "world-drop-zone"
  | "hr-server"
  | "economy-patch"
  | "politik-boss-fight"
  | "gg-or-no-gg";

export interface Category {
  slug: CategorySlug;
  name: string;
  blurb: string;
  accent: "green" | "purple";
}

export const CATEGORIES: Category[] = [
  {
    slug: "world-drop-zone",
    name: "World Drop Zone",
    blurb: "Globalne vijesti — tko je lootao, tko je eliminiran.",
    accent: "green",
  },
  {
    slug: "hr-server",
    name: "HR Server",
    blurb: "Vijesti iz domaceg servera. Ping visok, drama stabilna.",
    accent: "purple",
  },
  {
    slug: "economy-patch",
    name: "Economy Patch",
    blurb: "Novac, trzista i inflacija — svaki patch note je bitan.",
    accent: "green",
  },
  {
    slug: "politik-boss-fight",
    name: "Politik Boss Fight",
    blurb: "Politicka arena. Mehanike se mijenjaju, exploitovi ostaju.",
    accent: "purple",
  },
  {
    slug: "gg-or-no-gg",
    name: "GG or No GG",
    blurb: "Kultura, sport, sve ostalo. Na kraju — GG ili flame u chatu?",
    accent: "green",
  },
];

export const CATEGORY_MAP: Record<CategorySlug, Category> = CATEGORIES.reduce(
  (acc, c) => {
    acc[c.slug] = c;
    return acc;
  },
  {} as Record<CategorySlug, Category>
);

export function getCategory(slug: string): Category | undefined {
  return CATEGORY_MAP[slug as CategorySlug];
}
