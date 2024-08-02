"use client";
import { MenuCardModal } from "@/app/user/profile/_components/menu-card-modal";
import { OrderList } from "@/app/user/profile/_components/order-list";
import { Tab, Tabs } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { UserSearch } from "../_components/user-search";
import { User } from "next-auth";

export default function AdminProfilePage() {
  const { data: session } = useSession();
  const [open, setOpen] = useState<string | null>(null);
  const [selected, setSelected] = useState<User | undefined>();
  const handleUserSearchClick = () => {
    console.log(selected);
  };
  const tabs = useMemo(
    () => [
      {
        title: "Orders",
        value: "Orders",
        content: <OrderList setOpen={setOpen} />,
      },
      {
        title: "Search Users",
        value: "Search Users",
        content: (
          <UserSearch
            onSaveClick={handleUserSearchClick}
            selected={selected}
            setSelected={setSelected}
          />
        ),
      },
    ],
    [],
  );
  const [active, setActive] = useState<Tab>(tabs[0] as Tab);
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
          <Tabs tabs={tabs} active={active} setActive={setActive} />
        </div>
      </div>
    </div>
  );
}
