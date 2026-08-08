import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Alex_Brush, Montserrat } from "next/font/google";
import BottomNav from "@/components/BottomNav";
import Petals from "@/components/Petals";
import AppShell from "@/components/AppShell";
import "./globals.css";

const playfair = Cormorant_Garamond({ variable: "--font-playfair", weight: ["300", "400", "600"], subsets: ["latin"] });
const greatVibes = Alex_Brush({ variable: "--font-script", weight: "400", subsets: ["latin"] });
const lato = Montserrat({ variable: "--font-lato", weight: ["300", "400", "500", "600"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aqil & Nadiah — Majlis Perkahwinan",
  description: "Jemputan Majlis Perkahwinan Aqil & Nadiah | 12.09.2026",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ms" className={`${playfair.variable} ${greatVibes.variable} ${lato.variable}`}>
      <body className="bg-[#f5e1e5] font-lato overflow-hidden">
        {/* Fixed floral border — sits above the scroll pane */}
        <div className="floral-frame" aria-hidden="true" />
        {/* Petals drift across every section */}
        <Petals />
        {/* Scrollable pane — masked so content only shows inside the frame */}
        <div className="content-viewport no-scrollbar">
          <div className="w-full max-w-[430px] min-h-dvh pb-20 bg-[#ffffff] mx-auto px-12">
            {children}
          </div>
        </div>
        {/* BottomNav lives outside the mask so it is never clipped */}
        <BottomNav />
        {/* Door + music player */}
        <AppShell />
      </body>
    </html>
  );
}
