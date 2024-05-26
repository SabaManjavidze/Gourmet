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
export default function ProfilePage() {
  const [open, setOpen] = useState<string | null>(null);
  const [addressOpen, setAddressOpen] = useState(false);

  const [activeTab, setActiveTab] = useState<
    string | "My Drafts" | "Order History"
  >("My Drafts");

  const fetchNextPage = () => {
    console.log("next page");
  };

  const closeModal = () => {
    setOpen(null);
  };

  return (
    <div className="container flex min-h-screen w-full flex-col items-center bg-background px-3 pt-32 md:flex-row md:items-start lg:px-5">
      {/* <EditDetailsModal isOpen={detailsOpen} setIsOpen={setDetailsOpen} />
      <AddAddressModal isOpen={addressOpen} setIsOpen={setAddressOpen} /> */}

      <MenuCardModal open={!!open} closeModal={closeModal} />
      <div className="flex w-full flex-col items-center md:w-1/4 md:items-start">
        <div className="flex h-auto w-4/5 flex-col items-center justify-start">
          <Image
            src={
              "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png"
            }
            width={130}
            height={130}
            quality={100}
            className="h-[130px] rounded-full border-2 border-primary/70 object-cover"
            alt="User Profile Picture"
          />
          <h2 className="pt-3 text-2xl font-semibold">Saba Manjavidze</h2>
          <div className="flex items-center">
            {/* <people size={20} /> */}

            <h2 className="ml-2 text-center font-medium text-primary-foreground">
              {/* {personalDetails.friendCount} */}
            </h2>
            <h2 className="ml-2">
              {/* {personalDetails.friendCount <= 1 ? "Friend" : "Friends"} */}
            </h2>
          </div>
          {/* <Button variant={"accent"} className="mt-6 w-full" size="lg">
            Add new entity
          </Button>
          <Button className="mt-2 w-full" size="lg">
            Add friends
          </Button> */}
        </div>
        {/* <div className="mt-6 w-4/5 md:w-full">
          <h3 className="text-md font-medium">Friend requests</h3>
          {friendRequests?.map((req) => (
            <FriendReqCard req={req} key={req.id} />
          ))}
        </div> */}
      </div>
      <div className="mt-6 w-full md:mt-0 md:w-3/4">
        <div className="flex w-full text-lg">
          <Tabs
            className="flex w-full flex-col items-center rounded-lg"
            onValueChange={setActiveTab}
            defaultValue="My Drafts"
            value={activeTab}
          >
            <TabsList className="flex w-full justify-start rounded-lg bg-muted p-2 py-0 pl-0">
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
                <div className="mt-5 grid grid-cols-4 gap-6">
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
