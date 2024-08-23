import { Input } from "@/components/ui/input";
import { TableRow, TableCell } from "@/components/ui/table";
import { useMenu } from "@/hooks/useMenu";
import type { ProductWithVariants, menuKey, productState } from "menu";
import { v4 as uuid } from "uuid";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DeleteIcon, XCircleIcon } from "lucide-react";

const cls = "border border-t-0 border-l-0 w-full p-5";
export function MenuProduct({
  product,
  menuSample,
}: {
  menuSample: string;
  product: productState;
}) {
  const { changeQuantity, hideZeroQt, changeVariant, handleRemoveProduct } =
    useMenu();
  return (
    <li
      // hidden={product.quantity == 0}
      className={`text-muted-sm ${hideZeroQt && product.quantity == 0 ? "hidden" : "flex"} 
      relative w-full justify-between text-center text-lg
      font-medium max-lg:text-base max-md:text-sm`}
    >
      <Button
        onClick={() => handleRemoveProduct(product.id)}
        className="absolute right-0 top-0 z-20 
       flex h-auto items-end bg-transparent p-0
      text-xs font-semibold text-muted-foreground hover:bg-transparent"
      >
        <DeleteIcon className="z-20 ml-1 max-md:h-4 max-md:w-4" size={20} />
      </Button>
      <div className="menu-table-items flex-col overflow-x-hidden">
        <p
          className={twMerge(
            cls,
            `${product.variants?.length ? "border-b-0 pb-2" : "h-full"} 
            overflow-hidden whitespace-nowrap border-l text-start`,
          )}
        >
          {product.active !== product.id
            ? product?.variants?.find((v) => v.id == product.active)?.name
            : product.name}
        </p>
        {product?.variants?.length ? (
          <ul className="flex gap-x-3 overflow-x-auto border border-t-0 px-4 pb-2">
            <li key={product.id}>
              <Button
                variant={"outline-accent"}
                onClick={() =>
                  changeVariant(menuSample, product.id, product.id)
                }
                className={`${product.active == product.id ? "bg-accent/30" : ""} 
                  menu-table-variants h-8 rounded-xl 
                  text-foreground`}
              >
                {product.name}
              </Button>
            </li>
            {product.variants?.map((variant) => (
              <li key={variant.id}>
                <Button
                  variant={"outline-accent"}
                  onClick={() =>
                    changeVariant(menuSample, product.id, variant.id)
                  }
                  className={`${product.active == variant.id ? "bg-accent/30" : ""} 
                  menu-table-variants h-8 rounded-xl text-foreground 
                  `}
                >
                  {variant.name}
                </Button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <div
        className="menu-table-other-fields flex justify-between whitespace-nowrap 
        *:h-full *:w-full"
      >
        <p className={twMerge(cls, "flex items-center justify-center")}>
          {product.price}
        </p>
        <Input
          type="number"
          min={0}
          onChange={(e) => {
            let val = e.currentTarget.value;
            if (val == "" && product.quantity !== 0) {
              val = "0";
            }
            const q = parseInt(val);
            if (isNaN(q)) return;
            changeQuantity(menuSample, product.id, q || 0);
          }}
          value={product.quantity.toString()}
          className={twMerge(cls, "h-full text-center focus-within:z-10")}
        />
        <p className={twMerge(cls, "flex items-center justify-center")}>
          {product.totalPrice}
        </p>
      </div>
    </li>
  );
}
