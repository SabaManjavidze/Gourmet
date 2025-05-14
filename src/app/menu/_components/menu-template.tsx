"use client";
import { Menu, menuKey, productsState } from "menu";
import { MenuProduct } from "./menu-product";
import { useMenu } from "@/hooks/useMenu";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { RouterOutputs } from "@/trpc/react";
import { AddProductsSection } from "./add-products-section";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useTranslations } from "next-intl";

export function MenuTemplate({
  name,
  header,
  footer,
  addable = true,
  addClick,
  className = "",
  id = "",
  title,
  // products = [],
}: {
  name: string;
  title?: string;
  // products: RouterOutputs["sampleMenu"]["getMainMenu"][string];
  className?: string;
  id?: string;
  addable?: boolean;
  addClick?: () => void;
  header?: ReactNode;
  footer?: ReactNode;
}) {
  const { menu, setHideZeroQt } = useMenu();
  const [listRef] = useAutoAnimate();
  const g = useTranslations("General");
  return (
    <div className="mt-16">
      <div className="flex w-full justify-center">
        <h3
          className="menu-title-gradient w-min max-w-full whitespace-nowrap 
        border-b border-b-accent font-lucida-bold text-5xl leading-[70px]
        max-lg:text-4xl max-md:whitespace-normal max-md:text-3xl max-sm:text-3xl"
        >
          {title ?? name}
        </h3>
      </div>
      {header ?? <div className="mt-10"></div>}
      <ul
        ref={listRef}
        id={id}
        className="flex w-full flex-col pt-8 max-md:pt-2"
      >
        <li
          key="234234"
          className={twMerge(
            `table-title-gradient max-h-18 flex h-full w-full justify-between
            text-center text-sm font-medium text-muted-sm 
              max-md:text-xs max-sm:text-xxs`,
            className,
          )}
        >
          <div className="menu-table-items border py-5 text-start font-bold">
            <p className="ml-5">{g("products")}</p>
          </div>
          <div
            className="menu-table-other-fields flex justify-between 
            whitespace-normal font-bold *:h-full *:w-full"
          >
            <div className="flex items-center justify-center border border-l-0">
              <p className="max-sm:max-w-10 ">{g("price")}</p>
            </div>
            <div className="flex items-center justify-center border border-l-0">
              <p className="overflow-hidden text-clip max-sm:max-w-9">
                {g("quantity")}
              </p>
            </div>
            <div className="flex items-center justify-center border border-l-0">
              <p className="overflow-hidden text-clip max-sm:max-w-10">
                {g("total price")}
              </p>
            </div>
          </div>
        </li>
        {menu[name]?.map((product, idx) => (
          <MenuProduct
            enabled={addable}
            key={product.id}
            product={product}
            menuSample={name}
          />
        ))}
      </ul>
      {footer ?? null}
      {addable && addClick ? <AddProductsSection onClick={addClick} /> : null}
    </div>
  );
}
