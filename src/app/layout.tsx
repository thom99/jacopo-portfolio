// layout.tsx - Root layout con stile fotografico
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import Navbar from "../components/Navbar";
import ScrollToTopButton from "../components/ScrollToTopButton";
import { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";

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
        className={`bg-[#fdfaf6] text-neutral-800 font-sans ${playfair.variable} flex flex-col min-h-screen`}
        style={{ fontFamily: "var(--font-serif)" }}
      >
        <Navbar />
        {/* <main className="pt-24 px-6 pb-12 max-w-5xl mx-auto flex-1"> */}
        <main className="px-6 max-w-5xl mx-auto flex-1">
          {children}
          <ScrollToTopButton />
        </main>
        <Toaster position="top-center" reverseOrder={false} />
        <Footer />
      </body>
    </html>
  );
}
