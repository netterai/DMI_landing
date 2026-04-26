import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const cabinet = localFont({
  src: [
    { path: "./fonts/cabinet-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/cabinet-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/cabinet-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/cabinet-800.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-cabinet",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://netter.ai"),
  title: {
    default: "Netter — Switch on your data",
    template: "%s · Netter",
  },
  description:
    "Netter turns the data sitting in your silos into dashboards, workflows, apps, and AI agents — live in 2 weeks, with no engineering team.",
  applicationName: "Netter",
  authors: [{ name: "Netter" }],
  keywords: [
    "Netter",
    "Data platform",
    "AI agents",
    "Dashboards",
    "Workflows",
    "Internal tools",
    "Y Combinator",
  ],
  openGraph: {
    title: "Netter — Switch on your data",
    description:
      "Connect, structure, and turn your company data into dashboards, workflows, apps, and AI agents — no engineering team required.",
    url: "https://netter.ai",
    siteName: "Netter",
    images: [
      {
        url: "/Netter-LinkedIn-Banner.png",
        width: 1200,
        height: 630,
        alt: "Netter",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Netter — Switch on your data",
    description:
      "Connect, structure, and turn your company data into dashboards, workflows, apps, and AI agents — no engineering team required.",
    images: ["/Netter-LinkedIn-Banner.png"],
  },
  icons: {
    icon: "/Netter-Symbol-Transparent.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#FCFAF7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cabinet.variable} antialiased`}>
      <body className="min-h-[100dvh] bg-bg text-text font-sans">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
