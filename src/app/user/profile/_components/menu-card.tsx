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
      className="rounded-lg border border-accent bg-white text-start duration-150 hover:shadow-md hover:shadow-black/15"
    >
      <ul className="group max-h-72 overflow-hidden px-4 py-2 pr-[21px] hover:overflow-auto hover:pr-4">
        {details.map(({ price, totalPrice, product, quantity }) => (
          <li
            key={nanoid()}
            className="mt-2 flex w-full max-w-full flex-col items-center text-muted-foreground first-of-type:mt-0"
          >
            <div className="flex w-full">
              <p className="max-h-6 w-2/3 overflow-hidden text-ellipsis">
                {product}
              </p>
              <div className="flex w-1/3 items-center justify-between">
                <p className="text-right">${price}</p>
                <p className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/55 text-center text-primary-foreground">
                  {quantity}
                </p>
                <p className="text-center">${totalPrice}</p>
              </div>
            </div>
            <div className="mt-1 h-[1px] w-4/5 bg-border" />
          </li>
        ))}
      </ul>
      <div className="flex w-full flex-col justify-between border-t border-accent p-2 px-4">
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
