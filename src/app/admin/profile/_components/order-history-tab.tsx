"use client";
import { useTabs } from "@/components/ui/tabs";
import { Loader2, Mail } from "lucide-react";
import Image from "next/image";
import { User } from "next-auth";
import { useAdmin } from "@/hooks/useAdmin";
import { UserSearch } from "./user-search";
import { api } from "@/trpc/react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { CustomPagination } from "@/components/custom-pagination";
import { MenuCardModal } from "./menu-card-modal";
import { limitTxt } from "@/lib/utils";

export function OrderHistoryTab() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const page = Number(searchParams.get("page") ?? 1);
  const { data: ordersData, isLoading: ordersLoading } =
    api.admin.getOrderHistory.useQuery({
      page,
      limit: 8,
    });
  const { open, setOpen, selected, setSelected } = useAdmin();
  const closeModal = () => {
    setOpen(null);
  };
  const { switchTab } = useTabs();

  useEffect(() => {
    if (ordersData && Number(ordersData?.totalPages) + 1 < page) {
      router.replace(`${pathname}?page=${ordersData.totalPages + 1}`);
    }
  }, [ordersData]);
  if (ordersData?.orders.length == 0 && ordersLoading)
    return (
      <div className="flex min-h-[400px] w-full items-center justify-center bg-background">
        <Loader2 size={50} color={"black"} />
      </div>
    );
  const handleUserClick = (user: User, orderId: string) => {
    if (open !== orderId) {
      setOpen(orderId);
    }
    if (selected?.id !== user.id) setSelected(user);
  };
  return (
    <div>
      {!!open ? (
        <MenuCardModal open={true} orderId={open} closeModal={closeModal} />
      ) : null}
      <ul>
        {ordersData?.orders.map(({ order, user }) => (
          <button
            key={order.id}
            className={`flex w-[90%] items-center justify-between border border-t-transparent 
            px-8 py-2 font-semibold duration-150 first:border-t-border 
            hover:border-t hover:!border-accent/50 hover:bg-accent/15
            ${selected?.id === user.id ? "border-accent !border-t-accent bg-accent/25" : ""}`}
            onClick={() => handleUserClick(user, order.id)}
          >
            <div className="flex items-center gap-x-4">
              <h3 className="text-base">{limitTxt(user.name, 16)}</h3>
              <h3 className="flex items-center gap-x-2">
                <Mail size={15} />
                {user.email}
              </h3>
            </div>
            <h3
              className="flex w-4 items-center justify-center
                    whitespace-nowrap rounded-full text-sm text-muted-foreground"
            >
              {order.createdAt.toLocaleDateString()}
            </h3>
            <h3
              className="flex w-4 items-center justify-center
                    whitespace-nowrap rounded-full text-sm text-accent-foreground"
            >
              {limitTxt(order.name, 28)}
            </h3>
            <div className="flex items-center gap-x-4">
              <div className="flex items-center gap-x-2">
                <h3
                  className="flex w-4 items-center
                    justify-center rounded-full text-sm text-green-500"
                >
                  ${order.totalPrice}
                </h3>
              </div>
            </div>
          </button>
        ))}
      </ul>
      <div>
        {Number(ordersData?.totalPages) > 1 ? (
          <CustomPagination
            totalPages={ordersData?.totalPages ?? 0}
            page={page}
            args={`status=${status}`}
          />
        ) : null}
      </div>
    </div>
  );
}
