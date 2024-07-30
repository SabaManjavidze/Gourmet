"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { v4 as uuid } from "uuid";
import error from "next/error";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { PaginationProvider } from "@/hooks/usePagination";
import { MenuCard } from "./_components/menu-card";
import { MenuCardModal } from "./_components/menu-card-modal";
import { useSession } from "next-auth/react";
import { api } from "@/trpc/react";
import { Loader2 } from "lucide-react";
import { OrderList } from "./_components/order-list";
import { useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";

export default function ProfilePage() {
  const [open, setOpen] = useState<string | null>(null);
  const { data: session } = useSession();

  const closeModal = () => {
    setOpen(null);
  };

  return (
    <div className="container flex min-h-screen flex-col justify-between pb-96 pt-28">
      <div
        className="flex w-full flex-col 
      items-center bg-background px-3 max-md:px-0 md:flex-row md:items-start lg:px-5"
      >
        {!!open ? (
          <MenuCardModal open={!!open} orderId={open} closeModal={closeModal} />
        ) : null}
        <div className="flex w-full flex-col items-center md:w-1/4 md:items-start">
          <div className="flex h-auto w-full flex-col items-center justify-start">
            <Image
              src={session?.user.image ?? "/imgs/saba.jpg"}
              width={120}
              height={120}
              quality={100}
              className="h-[120px] rounded-full border-4 border-accent object-cover"
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
          <Tabs
            tabs={[
              {
                title: "My Drafts",
                value: "My Drafts",
                content: <OrderList setOpen={setOpen} />,
              },
              {
                title: "Order History",
                value: "Order History",
                content: <OrderList setOpen={setOpen} />,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
