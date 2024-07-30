"use client";

import { cn } from "@/lib/utils";
import { v4 as uuid } from "uuid";
import { useState } from "react";
import { MenuCardModal } from "./menu-card-modal";
import { ProductWithVariants } from "menu";
import { GrabIcon, Trash, XCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";

export function MenuCard({
  id,
  title,
  totalPrice,
  created_at,
  products,
  onClick,
}: {
  id: string;
  title: string;
  created_at: string;
  totalPrice: string;
  onClick: () => void;
  products: (ProductWithVariants & { quantity: number })[];
}) {
  const utils = api.useUtils();
  const { mutateAsync: deleteOrder } = api.order.deleteUserOrder.useMutation({
    onSuccess() {
      utils.order.getUserOrders.invalidate();
    },
  });
  const handleDeleteClick = async () => {
    await deleteOrder({ orderId: id });
  };
  return (
    <div className="relative rounded-lg bg-white">
      <Button
        onClick={handleDeleteClick}
        className="absolute right-0 top-4 z-20 mt-1 
      flex -translate-y-full translate-x-1/2 items-end bg-transparent
      text-xs font-semibold text-muted-foreground hover:bg-transparent"
      >
        <XCircleIcon className="z-20 ml-1" />
      </Button>
      <button
        onClick={onClick}
        className="flex w-full flex-col justify-center 
        border border-accent text-start duration-150 hover:shadow-lg hover:shadow-black/15"
      >
        <ul className="group h-60 overflow-hidden px-4 py-2 pr-[21px] hover:overflow-auto">
          {products.map(({ price, name, id, quantity }) => (
            <li
              key={id}
              className="mt-2 flex w-full max-w-full flex-col items-center text-muted-foreground first-of-type:mt-0"
            >
              <div className="flex w-full">
                <p className="max-h-6 w-2/3 overflow-hidden text-ellipsis">
                  {name}
                </p>
                <div className="flex w-1/3 items-center justify-between">
                  <p className="text-right">${price}</p>
                  <p className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/55 text-center text-primary-foreground">
                    {quantity}
                  </p>
                  <p className="text-center">${quantity * price}</p>
                </div>
              </div>
              <div className="mt-1 h-[1px] w-4/5 bg-border" />
            </li>
          ))}
        </ul>
        <div className="flex w-full flex-col justify-between border-t border-accent p-2 px-4">
          <div className="flex justify-between">
            <h4 className="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-semibold">
              {title}
            </h4>
            <h4 className="text-lg font-semibold">${totalPrice}</h4>
          </div>
          <h4 className="mt-1 text-xs font-semibold text-muted-foreground">
            {created_at}
          </h4>
        </div>
      </button>
    </div>
  );
}
