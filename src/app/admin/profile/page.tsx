"use client";
import { OrderList } from "@/app/user/profile/_components/order-list";
import { Tab, Tabs } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { AdminProvider } from "@/hooks/useAdmin";
import { AdminOrderList } from "./_components/admin-order-list";
import { UserSearchTab } from "./_components/user-search-tab";
import { OrderHistoryTab } from "./_components/order-history-tab";
import { InvoiceHistoryTab } from "./_components/invoice-history-tab";

const tabs = [
  {
    title: "Orders",
    value: "Orders",
    content: <AdminOrderList />,
  },
  {
    title: "Search Users",
    value: "Search Users",
    content: <UserSearchTab />,
  },
  {
    title: "Order History",
    value: "Order History",
    content: <OrderHistoryTab />,
  },
  {
    title: "Invoices",
    value: "Invoices",
    content: <InvoiceHistoryTab />,
  },
];
export default function AdminProfilePage() {
  const { data: session } = useSession();

  return (
    <div
      className="container flex min-h-screen flex-col
      justify-between pb-[40rem] pt-28 max-xl:pb-[65rem] max-lg:pb-[130rem]"
    >
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
                  ${
                    session?.user.role == "user"
                      ? "border-primary"
                      : "border-red-700"
                  }
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
            <Tabs tabs={tabs} />
          </AdminProvider>
        </div>
      </div>
    </div>
  );
}
