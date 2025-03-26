"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  Sheet,
  SheetClose,
} from "@/components/ui/sheet";
import { navRoutes } from "./navbar";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { PROFILE_ROUTE } from "@/lib/utils";
import {
  ExternalLink,
  Link2,
  Link2Icon,
  Link2OffIcon,
  LinkIcon,
  LogOut,
  PhoneCall,
} from "lucide-react";
import AuthModal from "./auth-modal";
// import { LanguageDropdown } from "@/components/language-dropdown";

export function NavDrawer({
  triggerButton,
}: {
  triggerButton?: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const routes = [
    {
      route: session?.user.role == "user" ? "/user/profile" : "/admin/profile",
      title: "პროფილი",
    },
    {
      route: "/about-us",
      title: "ჩვენს შესახებ",
    },
  ];
  const pathname = usePathname();
  const [auth, setAuth] = React.useState(false);
  return (
    <Sheet>
      <AuthModal modalOpen={auth} closeModal={() => setAuth(false)} />
      <SheetTrigger asChild>
        {triggerButton ?? <Button variant="outline">Open</Button>}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          {status == "authenticated" ? (
            <div className="relative flex flex-col items-center justify-center gap-y-2">
              <Image
                src={session.user?.image ?? "/imgs/saba.png"}
                width={65}
                height={65}
                className={`rounded-full border-[3px] object-cover ${
                  pathname == PROFILE_ROUTE ? "border-accent" : "border-primary"
                }`}
                alt="user profile image"
              />
              <h3 className="text-lg font-bold">{session.user?.name}</h3>
            </div>
          ) : (
            <div>
              <Button variant={"accent"} onClick={() => setAuth(true)}>
                <p className="mr-3">ავტორიზაცია</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="30"
                  height="30"
                  viewBox="0 0 48 48"
                  className="mr-1"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  ></path>
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  ></path>
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="33"
                  height="33"
                  viewBox="0 0 48 48"
                >
                  <linearGradient
                    id="Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1"
                    x1="9.993"
                    x2="40.615"
                    y1="9.993"
                    y2="40.615"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stop-color="#2aa4f4"></stop>
                    <stop offset="1" stop-color="#007ad9"></stop>
                  </linearGradient>
                  <path
                    fill="url(#Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)"
                    d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"
                  ></path>
                </svg>
              </Button>
            </div>
          )}
        </SheetHeader>
        <div className="grid py-4">
          <ul className="mt-3 flex flex-col gap-y-2 font-medium">
            {routes.map(({ title, route }, idx) => (
              <li key={idx}>
                <Link
                  className={twMerge(
                    "relative flex items-center gap-x-2 duration-150 ease-in-out hover:text-accent-foreground",
                    pathname == route
                      ? "text-base text-accent-foreground hover:text-orange-400"
                      : "",
                  )}
                  onClick={() => {
                    if (title == "კონტაქტი") {
                      document
                        .getElementById("footer")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  href={route}
                >
                  {route == pathname ? (
                    <div className="right-left absolute bottom-0 h-1 w-3/5 translate-y-1 rounded-xl bg-accent"></div>
                  ) : null}
                  {title}
                  <ExternalLink className="mb-1" size={15} />
                </Link>
              </li>
            ))}
          </ul>

          <span className="mt-3 flex items-center font-semibold">
            <h3 className="tracking-tight">+995 597 555 266 </h3>
            <PhoneCall className="ml-2" size={15} />
          </span>
        </div>
        {/* <div className="flex items-center justify-start">
          <LanguageDropdown
            iconSize={20}
            className="mt-0 justify-start p-0 text-sm first:!w-auto"
          />
        </div> */}

        <SheetFooter className="absolute bottom-5 left-5">
          {status == "authenticated" ? (
            <Button onClick={() => signOut()} variant={"text"}>
              <p className="mr-2 text-base">Log out</p>
              <LogOut size={15} />
            </Button>
          ) : null}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
