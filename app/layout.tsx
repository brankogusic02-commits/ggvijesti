import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

const SITE_URL = "https://ggvijesti.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "GGVijesti — Real world. Gaming mindset.",
    template: "%s · GGVijesti",
  },
  description:
    "Real-world news translated into gaming language. Svijet kao open-world, vijesti kao patch notes.",
  keywords: ["vijesti", "gaming", "Hrvatska", "svijet", "gg", "news"],
  openGraph: {
    type: "website",
    siteName: "GGVijesti",
    title: "GGVijesti — Real world. Gaming mindset.",
    description: "Svjetske i domace vijesti prevedene na jezik gamera.",
    url: SITE_URL,
    images: ["/og-default.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "GGVijesti",
    description: "Real world. Gaming mindset.",
    images: ["/og-default.svg"],
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="hr"
      className={`${orbitron.variable} ${rajdhani.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col">
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
