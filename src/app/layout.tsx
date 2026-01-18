import "@/styles/globals.css";
import NextTopLoader from "nextjs-toploader";
import { NextIntlClientProvider } from "next-intl";
import { Analytics } from "@vercel/analytics/next";
import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/react";
import SessionProvider from "@/app/_components/session-provider";
import { Navbar } from "./_components/navbar";
import { Footer } from "./_components/footer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";
import { env } from "@/env";
import { getLocale } from "next-intl/server";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  // variable: "--font-sans",
});

export const metadata = {
  title: "Gourmet",
  description: "Catering",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const locale = await getLocale();
  return (
    <html
      lang={locale}
      // className={inter.className}
      style={{ scrollBehavior: "smooth" }}
    >
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
      <body>
        <SessionProvider session={session}>
          <div
            className="logo fixed right-1/2 top-0 z-50 h-[100px] w-[125px] 
      translate-x-1/2 border-[3px] border-t-0 border-accent-light bg-nav-logo bg-cover 
      bg-center bg-no-repeat max-xl:hidden"
          />
          <NextIntlClientProvider>
            <NextTopLoader color="orange" showSpinner={false} />
            <Navbar />
            <Analytics />
            <TRPCReactProvider>{children}</TRPCReactProvider>
          </NextIntlClientProvider>
        </SessionProvider>
        {env.GOOGLE_TAG_MANAGER_ID && (
          <GoogleTagManager gtmId={env.GOOGLE_TAG_MANAGER_ID} />
        )}
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
