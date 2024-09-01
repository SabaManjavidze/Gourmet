import "@/styles/globals.css";
import NextTopLoader from "nextjs-toploader";
import { Inter } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/react";
import SessionProvider from "@/app/_components/session-provider";
import { Navbar } from "./_components/navbar";
import { Footer } from "./_components/footer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  // variable: "--font-sans",
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
    <html
      lang="en"
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
          <NextTopLoader color="orange" showSpinner={false} />
          <Navbar />
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </SessionProvider>
        <Toaster />
        <Footer />
        {/* <Script
          id="tbcCheckoutSdk"
          type="text/javascript"
          strategy="lazyOnload"
          src="https://ecom.tbcpayments.ge/tbccheckoutbutton/script.min.js?callback=TbcCallBack"
          defer
        ></Script>
        <Script defer>
          {`
redirectTbcCheckout=function(e){
      console.log({e})
return e
          }
    TbcCallBack = function() {TbcCheckout.Render({ type: 'large', color: 'blue' });
    document.getElementById('tbcCheckoutButton').addEventListener('click', redirectTbcCheckout)};
`}
        </Script>
        <div
          dangerouslySetInnerHTML={{ __html: `<TbcCheckout></TbcCheckout>` }}
        ></div> */}
      </body>
    </html>
  );
}
