"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, Fragment } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { PROFILE_ROUTE } from "@/lib/utils";
import { useTranslations } from "next-intl";

type UserProfileButtonPropTypes = {
  userPicture: string;
  username: string;
};

const ProfileButton = ({
  userPicture,
  username,
}: UserProfileButtonPropTypes) => {
  const { data: session } = useSession();
  const profileOptions = [
    {
      title: "პროფილი",
      path: session?.user.role == "user" ? "/user/profile" : "/admin/profile",
    },
  ];
  const t = useTranslations("Profile Dropdown");
  const pathname = usePathname();
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button className="p-0 !outline-none">
          <div className="relative flex items-center justify-center">
            <Image
              src={userPicture}
              width={35}
              height={35}
              className={`rounded-full border-2 object-cover p-0 ${
                pathname == PROFILE_ROUTE
                  ? "border-accent"
                  : session?.user.role == "user"
                    ? "border-primary"
                    : "border-red-700"
              }`}
              alt="user profile image"
            />
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-2 w-48">
        <DropdownMenuLabel className="flex w-full flex-col items-center">
          <h3 className="text-md mx-3 whitespace-nowrap">
            {username.slice(0, 20)}
          </h3>
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          {profileOptions.map((item, idx) => (
            <DropdownMenuItem
              className="hover:!bg-primary/[.08]"
              key={item.path}
            >
              <Link href={item.path} className="w-full">
                {t("title" + (idx + 1))}
              </Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem className="hover:!bg-primary/[.08]">
            <button
              onClick={() => signOut()}
              className="m-0 flex w-full justify-start p-0"
            >
              {t("log out")}
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileButton;
