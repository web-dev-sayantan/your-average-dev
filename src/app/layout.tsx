import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import { CONSENT_COOKIE, parseConsentCookieValue } from "@/lib/cookies/consent";
import type { Theme } from "@/lib/theme";
import { ThemeProvider, ThemeScript } from "@/lib/theme";
import "./globals.css";
import AnalyticsConsent from "@/components/analytics-consent";
import CookieBanner from "@/components/cookie-banner";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.anaverage.dev",
  ),
  title: {
    default: "Sayantan Dey | an_average_dev",
    template: "%s | an_average_dev",
  },
  description: "A low effort compilation of me as a developer.",
  applicationName: "an_average_dev",
  manifest: "/site.webmanifest",
  authors: [{ name: "Sayantan Dey", url: "/" }],
  creator: "Sayantan Dey",
  openGraph: {
    title: "Sayantan Dey | an_average_dev",
    description: "A low effort compilation of me as a developer.",
    url: "/",
    siteName: "an_average_dev",
    type: "website",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "an_average_dev",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sayantan Dey | an_average_dev",
    description: "A low effort compilation of me as a developer.",
    creator: "@no0bdev",
    images: ["/android-chrome-512x512.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const consentValue = cookieStore.get(CONSENT_COOKIE)?.value;
  const consent = parseConsentCookieValue(consentValue);
  const storedTheme = consent?.appearance
    ? cookieStore.get("theme")?.value
    : undefined;
  const defaultTheme: Theme | undefined =
    storedTheme === "light" ||
    storedTheme === "dark" ||
    storedTheme === "system"
      ? storedTheme
      : undefined;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <ThemeProvider defaultTheme={defaultTheme}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:text-foreground focus:shadow-md"
          >
            Skip to main content
          </a>
          <div className="grain-overlay" aria-hidden="true" />
          <Navbar />
          <main className="flex-1 flex flex-col w-full">{children}</main>
          <Footer />
          <AnalyticsConsent />
          <CookieBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
