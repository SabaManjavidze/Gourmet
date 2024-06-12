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

const routes = [
  {
    title: "Home",
    route: "/",
  },
  {
    title: "About Us",
    route: "/about-us",
  },
  {
    title: "Menu",
    route: "/menu",
  },

  {
    title: "Catering",
    route: "/catering",
  },
  {
    title: "Contact Us",
    route: "/#footer",
  },
];
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const closeDrawer = () => {
    setOpen(false);
  };
  const mobileRoutes = ["Home", "About Us", "Menu"];
  const handleCloseAuthModal = () => setAuthOpen(false);
  return (
    <nav className="bg-accent-light sticky top-0 z-40 flex h-16 items-center justify-between border-b px-10 max-lg:justify-center">
      <NavDrawer open={open} closeDrawer={closeDrawer} />
      <AuthModal modalOpen={authOpen} closeModal={handleCloseAuthModal} />
      <div className="logo border-accent-light absolute right-1/2 top-0 z-20 h-[120px] w-[145px] translate-x-1/2 border-[3px] border-t-0 bg-nav-logo bg-cover bg-center bg-no-repeat max-xl:hidden">
        {/* <h3 className="logo-text absolute bottom-0 right-1/2 translate-x-1/2 translate-y-full text-3xl font-bold uppercase ">
          Gourmet
        </h3> */}
      </div>
      <div className="absolute left-5 top-1/2 -translate-y-1/2 lg:hidden">
        <Button
          variant={"outline"}
          className="border-2 p-2 duration-150 hover:text-accent-foreground"
          onClick={() => setOpen(true)}
        >
          <MenuIcon />
        </Button>
      </div>
      <div>
        <ul className="flex gap-x-10 font-medium">
          {routes.map(({ route, title }, idx) => (
            <li
              key={idx}
              className={`${mobileRoutes.includes(title) ? "block" : "max-xl:!hidden"}`}
            >
              <Link
                className={twMerge(
                  "relative text-sm duration-150 ease-in-out hover:text-accent-foreground",
                  pathname == route
                    ? "text-base text-accent-foreground hover:text-orange-400"
                    : "",
                )}
                href={route}
              >
                {route == pathname ? (
                  <div className="right-left absolute bottom-0 h-1 w-3/5 translate-y-1 rounded-xl bg-accent"></div>
                ) : null}
                {title}
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
          <h3 className="font-semibold tracking-tight">+995 597 555 266</h3>
        </span>
        <LanguageDropdown />
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
