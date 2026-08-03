import type { Metadata, Viewport } from "next";
import "katex/dist/katex.min.css";
import "./globals.css";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Circuit Partitioning",
    template: "%s · Circuit Partitioning",
  },
  description:
    "An open, inspectable knowledge base for learning, comparing, and advancing circuit partitioning research.",
  applicationName: "Circuit Partitioning",
  keywords: [
    "circuit partitioning",
    "hypergraph partitioning",
    "electronic design automation",
    "benchmark",
    "critical path",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "Circuit Partitioning",
    description:
      "Open theory, research context, data contracts, and reproducible comparisons for circuit partitioning.",
    images: [{ url: "/og-circuit-partitioning.png", width: 1731, height: 909 }],
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f3f0e8",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
