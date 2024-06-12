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
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { PROFILE_ROUTE } from "@/lib/utils";

type UserProfileButtonPropTypes = {
  userPicture: string;
  username: string;
};

const ProfileButton = ({
  userPicture,
  username,
}: UserProfileButtonPropTypes) => {
  const profileOptions = [{ title: "Profile", path: "/user/profile" }];
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
              className={`rounded-full border-[3px] object-cover ${
                pathname == PROFILE_ROUTE ? "border-accent" : "border-primary"
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
          {profileOptions.map((item) => (
            <DropdownMenuItem
              className="hover:!bg-primary/[.08]"
              key={item.path}
            >
              <Link href={item.path} className="w-full">
                {item.title}
              </Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem className="hover:!bg-primary/[.08]">
            <button
              onClick={() => signOut()}
              className="m-0 flex w-full justify-start p-0"
            >
              Logout
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileButton;
