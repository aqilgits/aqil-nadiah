import type { Metadata, Viewport } from "next";
import { Playfair_Display, Great_Vibes, Lato } from "next/font/google";
import BottomNav from "@/components/BottomNav";
import Petals from "@/components/Petals";
import "./globals.css";

const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"] });
const greatVibes = Great_Vibes({ variable: "--font-script", weight: "400", subsets: ["latin"] });
const lato = Lato({ variable: "--font-lato", weight: ["300", "400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nadiah & Aqil — Majlis Perkahwinan",
  description: "Jemputan Majlis Perkahwinan Nadiah & Aqil | 30.08.2026",
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
      <body className="bg-[#e5dcf0] font-lato overflow-hidden">
        {/* Fixed floral border — sits above the scroll pane */}
        <div className="floral-frame" aria-hidden="true" />
        {/* Petals drift across every section */}
        <Petals />
        {/* Scrollable pane — masked so content only shows inside the frame */}
        <div className="content-viewport no-scrollbar">
          <div className="w-full max-w-[430px] min-h-dvh pb-20 bg-[#f7f3fb] mx-auto">
            {children}
          </div>
        </div>
        {/* BottomNav lives outside the mask so it is never clipped */}
        <BottomNav />
      </body>
    </html>
  );
}
