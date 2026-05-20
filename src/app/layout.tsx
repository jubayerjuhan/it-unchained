import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  title: "IT Unchained – Hires Top IT Talents, Save 20% with French Innovation Accreditation",
  description: "IT Unchained hires top IT talents. Save 20% with French Innovation Accreditation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} ${syne.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
