"use client";
import { Menu, menuKey, productsState } from "menu";
import { MenuProduct } from "./menu-product";

import { useMenu } from "@/hooks/useMenu";
import { v4 as uuid } from "uuid";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { RouterOutputs } from "@/trpc/react";
import { AddProductsSection } from "./add-products-section";

export function MenuTemplate({
  name,
  header,
  footer,
  addable = true,
  addClick,
  className = "",
  id = "",
  // products = [],
}: {
  name: string;
  // products: RouterOutputs["sampleMenu"]["getMainMenu"][string];
  className?: string;
  id?: string;
  addable?: boolean;
  addClick?: () => void;
  header?: ReactNode;
  footer?: ReactNode;
}) {
  const { menu, setHideZeroQt } = useMenu();
  return (
    <div className="mt-16">
      <div className="flex w-full justify-center">
        <h3
          className="menu-title-gradient w-min whitespace-nowrap border-b 
        border-b-accent font-lucida-bold text-5xl leading-[70px]"
        >
          {name}
        </h3>
      </div>
      {header ?? <div className="mt-10"></div>}
      <ul id={id} className="flex w-full flex-col pt-8">
        <li
          key="234234"
          className={twMerge(
            `table-title-gradient max-h-18 flex h-full w-full 
              justify-between text-center text-sm font-medium text-muted-sm 
              max-md:text-xs max-sm:text-xxs`,
            className,
          )}
        >
          <div className="w-1/2 border py-5 text-start font-bold max-sm:w-2/5 max-xs:w-1/4 xl:w-3/4">
            <p className="ml-5">Items</p>
          </div>
          <div
            className="xl:1/4 flex w-1/2 justify-between whitespace-nowrap font-bold 
              *:h-full *:w-full max-sm:w-3/5 max-sm:whitespace-pre-line max-xs:w-3/4"
          >
            <p className="flex w-full items-center justify-center border border-l-0">
              Price
            </p>
            <p className="flex w-full items-center justify-center border border-l-0">
              Quantity
            </p>
            <p className="flex w-full items-center justify-center border border-l-0">
              Total Price
            </p>
          </div>
        </li>
        {menu[name]?.map((product, idx) => (
          <MenuProduct key={product.id} product={product} menuSample={name} />
        ))}
      </ul>
      {footer ?? null}
      {addable && addClick ? <AddProductsSection onClick={addClick} /> : null}
    </div>
  );
}
