"use client";

import { Button } from "@/components/ui/button";
import { useAdmin } from "@/hooks/useAdmin";
import { UserRole } from "@/lib/types";
import { limitTxt } from "@/lib/utils";
import { api, RouterOutputs } from "@/trpc/react";
import { Mail } from "lucide-react";
import { User } from "next-auth";
import { toast } from "sonner";

export function InvoiceCard({
  order,
  user,
}: RouterOutputs["admin"]["getInvoiceHistory"]["invoices"][number]) {
  const { mutateAsync: confirmInvoice, isPending: confirmationLoading } =
    api.admin.confirmInvoice.useMutation();
  const utils = api.useUtils();
  const { selected, setOpen, open, setSelected } = useAdmin();
  const handleAcceptClick = async (orderId: string) => {
    await confirmInvoice({ orderId });
    await utils.admin.getInvoiceHistory.invalidate();
    toast.success("Invoice was confirmed.");
  };
  const handleUserClick = (user: User, orderId: string) => {
    if (open !== orderId) {
      setOpen(orderId);
    }
    if (selected?.id !== user.id) setSelected(user);
  };
  return (
    <div
      className={`flex border first:border-t-border
              ${selected?.id === user.id ? "border-accent !border-t-accent bg-accent/25" : ""} 
            hover:border-t hover:!border-accent/50 `}
    >
      <button
        key={order.id}
        className={`flex w-[90%] items-center justify-between px-8 py-2 
                font-semibold duration-150 first:border-t-border 
                hover:bg-accent/15
            `}
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
      <Button
        variant="outline"
        onClick={() => handleAcceptClick(order.id)}
        isLoading={confirmationLoading}
        className="border-y-0 border-green-500 text-green-500 hover:border-green-500
              hover:bg-green-50 focus:border-green-500 active:!border-green-500 active:bg-green-100
              "
      >
        Accept
      </Button>
    </div>
  );
}
