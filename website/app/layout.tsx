import type { Metadata } from "next";
import {
  Plus_Jakarta_Sans,
  Instrument_Serif,
} from "next/font/google";

import "leaflet/dist/leaflet.css";
import "./globals.css";

import { Toaster } from "react-hot-toast";

import PromotionalTopBar from "@/app/Components/Home/PromotionalTopBar";
import Navbar from "@/app/Components/Navbar";
import Footer from "@/app/Components/Footer";
import LimitedOffer from "@/app/Components/Home/LimitedOffer";
import BottomBar from "@/app/Components/BottomBar";
import ChatBox from "@/app/Components/ChatBox";

/* =========================================================
   FONTS
========================================================= */

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  title: "SBS TAXI - Safe. Reliable. Anytime.",
  description:
    "SBS Taxi - One Brand. One Fare. One Trusted Service.",
};

/* =========================================================
   ROOT LAYOUT
========================================================= */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${jakarta.variable} ${instrumentSerif.variable}`}
      >
        {/* ===================================================
            HEADER
        ==================================================== */}

        <div className="sticky top-0 z-[100] w-full">
          {/* PROMOTIONAL BAR */}

          <PromotionalTopBar />

          {/* NAVBAR */}

          <Navbar />
        </div>

        {/* ===================================================
            PAGE CONTENT
        ==================================================== */}

        <main>{children}</main>

        {/* ===================================================
            LIMITED OFFER
        ==================================================== */}

        <LimitedOffer />

        {/* ===================================================
            CHAT BOX
        ==================================================== */}

        <ChatBox />

        {/* ===================================================
            BOTTOM BAR
        ==================================================== */}

        <BottomBar />

        {/* ===================================================
            FOOTER
        ==================================================== */}

        <Footer />

        {/* ===================================================
            TOAST
        ==================================================== */}

        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={10}
          toastOptions={{
            duration: 3000,

            style: {
              background: "#ffffff",
              color: "#111827",
              borderRadius: "10px",
              border: "1px solid #e5e7eb",
              boxShadow:
                "0 8px 24px rgba(0,0,0,0.12)",
            },

            success: {
              iconTheme: {
                primary: "#22c55e",
                secondary: "#ffffff",
              },
            },

            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#ffffff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}