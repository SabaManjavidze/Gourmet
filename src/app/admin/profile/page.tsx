"use client";
import { OrderList } from "@/app/user/profile/_components/order-list";
import { Tab, Tabs } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { UserSearch } from "./_components/user-search";
import { User } from "next-auth";
import { AdminProvider } from "@/hooks/useAdmin";
import { AdminOrderList } from "./_components/admin-order-list";

export default function AdminProfilePage() {
  const { data: session } = useSession();

  const tabs =
    [
      {
        title: "Orders",
        value: "Orders",
        content: <AdminOrderList />,
      },
      {
        title: "Search Users",
        value: "Search Users",
        content: (
          <UserSearch
          />
        ),
      },
    ]

  return (
    <div className="container flex min-h-screen flex-col justify-between pb-96 pt-28">
      <div
        className="flex w-full flex-col 
      items-center bg-background px-3 max-md:px-0 md:flex-row md:items-start lg:px-5"
      >
        <div className="flex w-full flex-col items-center md:w-1/4 md:items-start">
          <div className="flex h-auto w-full flex-col items-center justify-start">
            <Image
              src={session?.user.image ?? "/imgs/saba.jpg"}
              width={120}
              height={120}
              quality={100}
              className={`h-[120px] rounded-full border-4 border-accent object-cover
                  ${session?.user.role == "user"
                  ? "border-primary"
                  : "border-red-700"}
            `}
              alt="User Profile Picture"
            />
            <h2 className="pt-3 text-2xl font-semibold">
              {session?.user.name ?? "Saba Manjavidze"}
            </h2>
          </div>
        </div>
        <div
          className={`flex w-full max-w-5xl flex-col items-start justify-start [perspective:1000px]`}
        >
          <AdminProvider>
            <Tabs
              tabs={tabs}
            />
          </AdminProvider>
        </div>
      </div>
    </div>
  );
}
