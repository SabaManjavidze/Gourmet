"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Tab, Tabs } from "@/components/ui/tabs";
import { MenuCardModal } from "./_components/menu-card-modal";
import { useSession } from "next-auth/react";
import { OrderList } from "./_components/order-list";
import { Status } from "@/server/api/routers/orders";
import { useTranslations } from "next-intl";

export default function ProfilePage() {
  const [open, setOpen] = useState<{ id: string; status: Status } | null>(null);
  const { data: session } = useSession();
  const t = useTranslations("Profile Page");
  const tabs = [
    {
      title: t("saved menus"),
      value: "My Drafts",
      content: (
        <OrderList setOpen={(id: string) => setOpen({ id, status: "draft" })} />
      ),
    },
    {
      title: t("submitted orders"),
      value: "Submitted",
      content: (
        <OrderList
          setOpen={(id: string) => setOpen({ id, status: "submitted" })}
          status="submitted"
        />
      ),
    },
    {
      title: t("order history"),
      value: "Order History",
      content: (
        <OrderList
          setOpen={(id: string) => setOpen({ id, status: "completed" })}
          status="completed"
        />
      ),
    },
  ];

  const closeModal = () => {
    setOpen(null);
  };

  return (
    <div
      className="container flex min-h-screen flex-col justify-between
      pb-[40rem] pt-28 max-xl:pb-[65rem] max-lg:pb-[130rem] max-md:pt-14"
    >
      <div
        className="flex w-full flex-col 
      items-center bg-background px-3 max-md:px-0 md:flex-row md:items-start lg:px-5"
      >
        {open !== null ? (
          <MenuCardModal
            addable={open.status == "draft"}
            open={true}
            orderId={open.id}
            closeModal={closeModal}
          />
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
          className={`flex w-full max-w-5xl flex-col items-start justify-start 
[perspective:1000px] max-md:mt-5`}
        >
          <Tabs tabs={tabs} />
        </div>
      </div>
    </div>
  );
}
