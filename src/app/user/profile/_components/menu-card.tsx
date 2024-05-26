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
      <ul className="max-h-48 overflow-hidden px-4 py-2">
        {details.map(({ price, totalPrice, product, quantity }) => (
          <li key={nanoid()} className="flex max-w-full text-muted-foreground">
            <p className="w-1/2 overflow-hidden text-ellipsis">{product}</p>
            <p className="ml-6 w-1/4">{quantity}</p>
            <p className="w-1/4">${price}</p>
          </li>
        ))}
      </ul>
      <div className="w-full border-t p-2 px-4 ">
        <h4 className="text-lg font-semibold">{title}</h4>
      </div>
    </button>
  );
}
