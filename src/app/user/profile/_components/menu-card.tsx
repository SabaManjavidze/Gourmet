"use client";

import { cn } from "@/lib/utils";
import { nanoid } from "nanoid";
import { useState } from "react";
import { MenuCardModal } from "./menu-card-modal";

export function MenuCard({
  title,
  details,
  onClick,
}: {
  title: string;
  onClick: () => void;
  details: {
    price: number;
    product: string;
    quantity: number;
    totalPrice: number;
  }[];
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-lg border text-start shadow-lg duration-150 hover:shadow-black/15"
    >
      <ul className="group max-h-48 overflow-hidden px-4 py-2 pr-[21px] hover:overflow-auto hover:pr-4">
        {details.map(({ price, totalPrice, product, quantity }) => (
          <li key={nanoid()} className="flex max-w-full text-muted-foreground">
            <p className="max-h-6 max-w-[50%] overflow-hidden text-ellipsis">
              {product}
            </p>
            <p className="w-1/4 text-right">${price}</p>
            <p className="w-1/4 text-center">{quantity}</p>
          </li>
        ))}
      </ul>
      <div className="flex w-full flex-col justify-between border-t p-2 px-4">
        <div className="flex justify-between">
          <h4 className="text-lg font-semibold">{title}</h4>
          <h4 className="text-xs font-semibold text-muted-foreground">
            01/05/2024
          </h4>
          <h4 className="text-lg font-semibold">$124</h4>
        </div>
      </div>
    </button>
  );
}
