"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { nanoid } from "nanoid";
import error from "next/error";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PaginationProvider } from "@/hooks/usePagination";
import { MenuCard } from "./_components/menu-card";
import { MenuCardModal } from "./_components/menu-card-modal";

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
const tabs = ["My Drafts", "Order History"] as const;
type tabKey = (typeof tabs)[number];
export default function ProfilePage() {
  const [open, setOpen] = useState<string | null>(null);
  const [addressOpen, setAddressOpen] = useState(false);

  const [activeTab, setActiveTab] = useState<tabKey>("My Drafts");

  const fetchNextPage = () => {
    console.log("next page");
  };

  const closeModal = () => {
    setOpen(null);
  };

  return (
    <div className="container flex min-h-screen w-full flex-col items-center bg-background px-3 pt-32 max-md:px-0 md:flex-row md:items-start lg:px-5">
      {/* <EditDetailsModal isOpen={detailsOpen} setIsOpen={setDetailsOpen} />
      <AddAddressModal isOpen={addressOpen} setIsOpen={setAddressOpen} /> */}

      <MenuCardModal open={!!open} closeModal={closeModal} />
      <div className="flex w-full flex-col items-center md:w-1/4 md:items-start">
        <div className="flex h-auto w-4/5 flex-col items-center justify-start">
          <Image
            src={"/imgs/saba.jpg"}
            width={130}
            height={130}
            quality={100}
            className="h-[130px] rounded-full border-2 border-primary/70 object-cover"
            alt="User Profile Picture"
          />
          <h2 className="pt-3 text-2xl font-semibold">Saba Manjavidze</h2>
        </div>
      </div>
      <div className="mt-6 w-full md:mt-0 md:w-3/4">
        <div className="flex w-full text-lg">
          <Tabs
            className="flex w-full flex-col items-center rounded-lg"
            onValueChange={(value) => {
              if (tabs.includes(value as tabKey)) {
                setActiveTab(value as tabKey);
              }
            }}
            defaultValue="My Drafts"
            value={activeTab}
          >
            <TabsList className="table-title-gradient flex w-full justify-start rounded-lg bg-muted p-2 py-0 md:pl-0">
              <TabsTrigger
                key={nanoid()}
                value={"My Drafts"}
                className="sm:text-md rounded-l-lg border-primary-foreground/30 text-sm md:text-lg xl:text-xl"
              >
                My Drafts
              </TabsTrigger>
              <TabsTrigger
                key={nanoid()}
                value={"Order History"}
                className="sm:text-md rounded-none border-primary-foreground/30 text-sm md:text-lg"
              >
                Order History
              </TabsTrigger>
            </TabsList>
            <TabsContent value="My Drafts" className="w-full pb-4">
              <PaginationProvider
                fetchNextPage={fetchNextPage as any}
                pagesData={[]}
              >
                <div className="mt-5 grid grid-cols-4 gap-6 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:px-8 max-sm:grid-cols-1">
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
            </TabsContent>
            <TabsContent value="Order History" className="w-full pb-4">
              <div className="flex flex-col">
                <div className="p-10">
                  <div className="flex w-full items-center justify-between md:w-1/2">
                    <h2 className="text-2xl font-medium">Order History</h2>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
