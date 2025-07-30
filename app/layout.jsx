import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "./mobile.css";

// components

import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import ChatWidget from "@/components/ChatWidget";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainsMono",
});

export const metadata = {
  title: "Raghav Singh - Software Engineer & AI Enthusiast",
  description: "Portfolio of Raghav Singh, a software engineer and AI enthusiast with experience in React, Next.js, Python, and machine learning.",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jetbrainsMono.variable}>
        {/* Force Tailwind to generate custom background/border classes in production */}
        <div className="hidden bg-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.20)] hover:bg-[rgba(255,255,255,0.10)] border-[rgba(255,255,255,0.20)]"></div>
        <Header />
        <PageTransition>{children}</PageTransition>
        <ChatWidget />
      </body>
    </html>
  );
}
