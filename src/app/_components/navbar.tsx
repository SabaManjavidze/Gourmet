"use client";
import { LanguageDropdown } from "@/components/language-dropdown";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  LogIn,
  MenuIcon,
  Phone,
  PhoneCall,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { NavDrawer } from "./nav-drawer";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { useSession } from "next-auth/react";
import AuthModal from "./auth-modal";
import ProfileButton from "./profile-button";
import { useTranslations } from "next-intl";

export const navRoutes = [
  {
    title: "მთავარი",
    route: "/",
  },
  {
    title: "ჩვენს შესახებ",
    route: "/about-us",
  },
  {
    title: "ფურშეტი",
    route: "/catering",
  },
  {
    title: "კონტაქტი",
    route: "",
  },
] as const;
export const mobileRoutes = [
  "მთავარი",
  // "ფურშეტი",
  // "მენიუ",
] as (typeof navRoutes)[number]["title"][];
export function Navbar() {
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const handleCloseAuthModal = () => setAuthOpen(false);
  return (
    <nav
      className="fixed top-0 z-40 flex h-16 w-full items-center justify-between
    border-b border-b-accent-light bg-accent-light px-10 max-lg:justify-center"
    >
      <div className="absolute left-5 top-1/2 -translate-y-1/2 lg:hidden">
        <NavDrawer
          triggerButton={
            <Button
              variant={"outline"}
              className="rounded-xl border-[1.0pt] border-[#3A3A4A]
              bg-transparent p-2 duration-150 max-sm:h-8 max-sm:w-8"
              onClick={() => setOpen(true)}
            >
              <MenuIcon className="max-sm:h-5 max-sm:w-5" />
            </Button>
          }
        />
      </div>
      <AuthModal modalOpen={authOpen} closeModal={handleCloseAuthModal} />
      <div className="absolute left-5 top-1/2 -translate-y-1/2 lg:hidden"></div>
      <div>
        <ul className="flex gap-x-10 font-medium">
          {navRoutes.map(({ route, title }, idx) => (
            <li
              key={idx}
              className={`${mobileRoutes.includes(title) ? "block" : "max-xl:!hidden"}`}
            >
              <Link
                className={twMerge(
                  "relative text-sm duration-150 ease-in-out hover:text-accent-foreground max-sm:text-xs",
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
                  <div
                    className="right-left absolute bottom-0 h-[1px] w-3/5 
                  translate-y-1 rounded-3xl bg-accent"
                  ></div>
                ) : null}
                {t("title" + (idx + 1))}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <h3 className="absolute right-5 max-md:text-sm max-sm:hidden lg:hidden">
        +995 597 555 266
      </h3>
      <div className="flex items-center gap-x-10 *:!text-sm max-lg:hidden ">
        <span className="flex items-center">
          <PhoneCall className="mr-2" size={20} />
          <h3 className="font-semibold tracking-tight">+995 597 555 266 </h3>
        </span>
        <div className="flex justify-center">
          <LanguageDropdown />
        </div>
        <div className="text-blue-gray-900 flex gap-2 sm:justify-center">
          {status === "loading" ? (
            <Loader2 className="text-primary-foreground" />
          ) : session?.user ? (
            <ProfileButton
              userPicture={session.user.image as string}
              username={session.user.name as string}
            />
          ) : (
            <Button
              onClick={() => setAuthOpen(true)}
              variant={"link"}
              className="hover:text-skin-secondary m-0 p-0"
            >
              <LogIn size={20} />
            </Button>
          )}

          {/* <Link
            href="/user/profile"
            className={`opacity-80 duration-150 hover:text-accent hover:opacity-100
            ${ ? "scale-110 text-accent" : ""}`}
          >
            <UserCircle size={31} />
          </Link> */}
        </div>
      </div>
    </nav>
  );
}
