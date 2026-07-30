import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kalyani Government Engineering College (KGEC)",
  description: "Official Portal of Kalyani Government Engineering College",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full p-2 sm:p-2.5 md:p-3 flex flex-col font-sans relative">

        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
          <div className="absolute top-1/3 -right-32 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-125 h-125 bg-[#0f2552]/40 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 min-h-[calc(100vh-16px)] sm:min-h-[calc(100vh-20px)] w-full rounded-2xl border border-white/40 bg-white/95 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] backdrop-blur-2xl ring-1 ring-black/5 overflow-hidden flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
