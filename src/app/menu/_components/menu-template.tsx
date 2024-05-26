"use client";
import { Menu, menuKey, productsState } from "menu";
import { MenuProduct } from "./menu-product";

import { useMenu } from "@/hooks/useMenu";
import { nanoid } from "nanoid";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export function MenuTemplate({
  name,
  header,
  footer,
  className = "",
}: {
  name: menuKey;
  className?: string;
  header?: ReactNode;
  footer?: ReactNode;
}) {
  const { menu, setHideZeroQt } = useMenu();
  return (
    <div className="mt-16">
      <div className="flex w-full justify-center">
        <h3 className="menu-title-gradient w-min whitespace-nowrap border-b border-b-accent font-lucida-bold text-5xl">
          {name}
        </h3>
      </div>
      {header ?? <div className="mt-16"></div>}
      <ul className="mt-5 flex w-full flex-col">
        {menu[name]?.map((product, idx) => {
          return idx == 0 ? (
            <li
              key="234234"
              className={twMerge(
                `table-title-gradient flex w-full justify-between 
              text-center text-sm font-medium text-muted-sm`,
                className,
              )}
            >
              <div className="h-full w-2/3">
                <p className="border border-b-0 p-5 text-start text-xl font-bold">
                  Items
                </p>
              </div>
              <div className="flex w-1/3 justify-between font-bold *:w-full">
                <p className="border border-l-0 p-5">Price</p>
                <p className="border border-l-0 p-5">Quantity</p>
                <p className="border border-l-0 p-5">Total Price</p>
              </div>
            </li>
          ) : (
            <MenuProduct key={nanoid()} product={product} menuSample={name} />
          );
        })}
      </ul>
      {footer}
    </div>
  );
}
