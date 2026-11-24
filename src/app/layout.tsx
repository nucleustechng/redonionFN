import type { Metadata, Viewport } from "next";
import "./globals.css";
import { poppins } from "@/lib/fonts";
import CookieBanner from "@/components/CookieBanner";

export const metadata: Metadata = {
  title: {
    default: "Redonion",
    template: "%s | Redonion",
  },
  description:
    "Redonion - Secure P2P crypto transactions. Buy and sell cryptocurrency with ease.",
  keywords: ["crypto", "cryptocurrency", "P2P", "exchange", "trading"],
  authors: [{ name: "Redonion" }],
  creator: "Redonion",
  metadataBase: new URL("https://redonion.io"),
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Redonion",
    title: "Redonion",
    description:
      "Redonion - Secure P2P crypto transactions. Buy and sell cryptocurrency with ease.",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Redonion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Redonion",
    description:
      "Redonion - Secure P2P crypto transactions. Buy and sell cryptocurrency with ease.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
