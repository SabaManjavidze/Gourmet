"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { nanoid } from "nanoid";
import error from "next/error";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { PaginationProvider } from "@/hooks/usePagination";
import { MenuCard } from "./_components/menu-card";
import { MenuCardModal } from "./_components/menu-card-modal";
import { useSession } from "next-auth/react";

const ICON_SIZE = 22;
const drafts = [
  {
    title: "Sam",
    details: [
      {
        product: "khachapuri",
        quantity: 3,
        price: 3,
        totalPrice: 9,
      },
      {
        product: "khachapuri",
        quantity: 3,
        price: 3,
        totalPrice: 9,
      },
      {
        product: "khachapuri",
        quantity: 3,
        price: 3,
        totalPrice: 9,
      },
      {
        product: "khachapuri",
        quantity: 3,
        price: 3,
        totalPrice: 9,
      },
      {
        product: "khachapuri",
        quantity: 3,
        price: 3,
        totalPrice: 9,
      },
      {
        product: "khachapuri",
        quantity: 3,
        price: 3,
        totalPrice: 9,
      },
      {
        product: "khachapuri",
        quantity: 3,
        price: 3,
        totalPrice: 9,
      },
      {
        product: "khachapuri",
        quantity: 3,
        price: 3,
        totalPrice: 9,
      },
      {
        product: "khachapuri",
        quantity: 3,
        price: 3,
        totalPrice: 9,
      },
      {
        product: "khachapuri",
        quantity: 3,
        price: 3,
        totalPrice: 9,
      },
    ],
  },
  {
    title: "Jack",
    details: [
      {
        product: "khachapuri",
        quantity: 3,
        price: 3,
        totalPrice: 9,
      },
      {
        product: "khachapuri",
        quantity: 3,
        price: 3,
        totalPrice: 9,
      },
      {
        product: "khachapuri",
        quantity: 3,
        price: 3,
        totalPrice: 9,
      },
      {
        product: "khachapuri",
        quantity: 3,
        price: 3,
        totalPrice: 9,
      },
      {
        product: "khachapuri",
        quantity: 3,
        price: 3,
        totalPrice: 9,
      },
      {
        product: "khachapuri",
        quantity: 3,
        price: 3,
        totalPrice: 9,
      },
      {
        product: "khachapuri",
        quantity: 3,
        price: 3,
        totalPrice: 9,
      },
      {
        product: "khachapuri",
        quantity: 3,
        price: 3,
        totalPrice: 9,
      },
      {
        product: "khachapuri",
        quantity: 3,
        price: 3,
        totalPrice: 9,
      },
      {
        product: "khachapuri",
        quantity: 3,
        price: 3,
        totalPrice: 9,
      },
      {
        product: "khachapuri",
        quantity: 3,
        price: 3,
        totalPrice: 9,
      },
      {
        product: "khachapuri",
        quantity: 3,
        price: 3,
        totalPrice: 9,
      },
      {
        product: "khachapuri",
        quantity: 3,
        price: 3,
        totalPrice: 9,
      },
      {
        product: "khachapuri",
        quantity: 3,
        price: 3,
        totalPrice: 9,
      },
      {
        product: "khachapuri",
        quantity: 3,
        price: 3,
        totalPrice: 9,
      },
    ],
  },
];
// const tabs = ["My Drafts", "Order History"] as const;
// type tabKey = (typeof tabs)[number];
export default function ProfilePage() {
  const [open, setOpen] = useState<string | null>(null);
  const [addressOpen, setAddressOpen] = useState(false);
  const { data: session } = useSession();

  // const [activeTab, setActiveTab] = useState<tabKey>("My Drafts");

  const fetchNextPage = () => {
    console.log("next page");
  };

  const closeModal = () => {
    setOpen(null);
  };

  const tabs = [
    {
      title: "My Drafts",
      value: "My Drafts",
      content: (
        <PaginationProvider fetchNextPage={fetchNextPage as any} pagesData={[]}>
          <div className="relative grid w-full grid-cols-3 gap-6 bg-white max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:px-8 max-sm:grid-cols-1">
            {drafts.map(({ details, title }) => (
              <MenuCard
                key={nanoid()}
                title={title}
                onClick={() => setOpen(title)}
                details={details}
              />
            ))}
          </div>
        </PaginationProvider>
      ),
    },
    {
      title: "Order History",
      value: "Order History",
      content: (
        <PaginationProvider fetchNextPage={fetchNextPage as any} pagesData={[]}>
          <div className="relative grid w-full grid-cols-3 gap-6 bg-white max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:px-8 max-sm:grid-cols-1">
            {drafts.concat(drafts).map(({ details, title }) => (
              <MenuCard
                key={nanoid()}
                title={title}
                onClick={() => setOpen(title)}
                details={details}
              />
            ))}
          </div>
        </PaginationProvider>
      ),
    },
  ];

  return (
    <div className="container flex min-h-screen w-full flex-col items-center bg-background px-3 pt-32 max-md:px-0 md:flex-row md:items-start lg:px-5">
      <MenuCardModal open={!!open} closeModal={closeModal} />
      <div className="flex w-full flex-col items-center md:w-1/4 md:items-start">
        <div className="flex h-auto w-full flex-col items-center justify-start">
          <Image
            src={session?.user.image ?? "/imgs/saba.jpg"}
            width={180}
            height={180}
            quality={100}
            className="h-[180px] rounded-full border-4 border-accent object-cover"
            alt="User Profile Picture"
          />
          <h2 className="pt-3 text-3xl font-semibold">
            {session?.user.name ?? "Saba Manjavidze"}
          </h2>
        </div>
      </div>
      <div className="relative flex w-full max-w-5xl flex-col items-start justify-start [perspective:1000px]">
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
}
