import "@/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import SessionProvider from "@/app/_components/session-provider";
import { Navbar } from "./_components/navbar";
import { Footer } from "./_components/footer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Gourmet",
  description: "Fourshet",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" style={{ scrollBehavior: "smooth" }}>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`font-sans ${inter.variable}`}>
        <SessionProvider session={session}>
          <Navbar />
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </SessionProvider>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
