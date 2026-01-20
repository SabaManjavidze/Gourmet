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
        {env.NEXT_PUBLIC_META_PIXEL_ID && (
          <>
            <Script
              id="meta-pixel"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '${env.NEXT_PUBLIC_META_PIXEL_ID}');
                  fbq('track', 'PageView');
                `,
              }}
            />
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src={`https://www.facebook.com/tr?id=${env.NEXT_PUBLIC_META_PIXEL_ID}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
