// layout.tsx - Root layout con stile fotografico
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import Navbar from "./components/Navbar";
import ScrollToTopButton from "./components/ScrollToTopButton";

const playfair = localFont({
  src: "./fonts/PlayfairDisplay-Regular.ttf",
  display: "swap",
  variable: "--font-serif",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "J.S. Studio - Portfolio",
  description: "Fine art & lifestyle photography by Jacopo Stortini",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`bg-[#fdfaf6] text-neutral-800 font-sans ${playfair.variable}`}
        style={{ fontFamily: "var(--font-serif)" }}
      >
        <Navbar />
        <main className="pt-24 px-6 pb-12 max-w-5xl mx-auto min-h-screen">
          {children}
          <ScrollToTopButton />
        </main>
      </body>
    </html>
  );
}
