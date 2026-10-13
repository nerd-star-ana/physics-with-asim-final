import type { Metadata } from "next";
import { MotionConfig } from "framer-motion";
import { Inter, Space_Grotesk } from "next/font/google";

import { BackToTopButton } from "@/components/back-to-top";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { AuthProvider } from "@/context/auth-context";
import { LMSProvider } from "@/context/lms-context";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://physicswithasim.example"),
  title: {
    default: "Physics with Asim | Premium Physics Coaching",
    template: "%s | Physics with Asim",
  },
  description:
    "Physics with Asim delivers concept-first, exam-focused online physics tutoring for Cambridge and Edexcel qualifications.",
  keywords: [
    "Physics tutoring",
    "Cambridge physics",
    "Edexcel physics",
    "online physics lessons",
    "IGCSE physics",
    "A level physics",
  ],
  openGraph: {
    title: "Physics with Asim",
    description:
      "A premium educational platform for international physics qualifications.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" className={`${inter.variable} ${spaceGrotesk.variable} h-full`}>
      <body suppressHydrationWarning className="min-h-full antialiased">
        <ThemeProvider>
          <AuthProvider>
            <LMSProvider>
              <MotionConfig reducedMotion="user">
                <div className="relative flex min-h-screen flex-col">
                  <SiteHeader />
                  <div className="flex-1">{children}</div>
                  <SiteFooter />
                  <BackToTopButton />
                </div>
              </MotionConfig>
            </LMSProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
