import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import FloatingParticles from "@/components/layout/FloatingParticles";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "RadonWatch - Predictive Radon Analysis",
  description:
    "Understand your home's radon risk through AI-powered prediction and interactive education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${cormorant.variable} font-sans antialiased bg-dark-bg text-text-primary`}
        suppressHydrationWarning
      >
        <FloatingParticles />
        {children}
      </body>
    </html>
  );
}
