import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SafeAid — Help that reaches the people who need it",
  description:
    "SafeAid routes vulnerable people in Nigeria to verified shelters, legal aid, and emergency support over a single SMS — and gives caseworkers an AI-assisted dashboard to act fast, without ever storing personal data.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="bg-surface font-sans text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
