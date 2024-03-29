import type { Metadata } from "next";
import "./globals.css";
import { CSPostHogProvider } from "./providers";

import { Space_Grotesk } from "next/font/google";

const roboto = Space_Grotesk({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Upscale Compare",
  description: "Easily compare two images with a slider.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="/og-img.webp" />
      </head>

      <CSPostHogProvider>
        <body className={roboto.className}>{children}</body>
      </CSPostHogProvider>
    </html>
  );
}
