import { Input } from "@/components/ui/input";
import { TableRow, TableCell } from "@/components/ui/table";
import { useMenu } from "@/hooks/useMenu";
import type { ProductWithVariants, menuKey, productState } from "menu";
import { v4 as uuid } from "uuid";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DeleteIcon, XCircleIcon } from "lucide-react";
import { VariantAccordion } from "./variant-accordion";
// import { VariantAccordion } from "./variant-accordion";

const cls = "border border-t-0 border-l-0 w-full p-5";
export function MenuProduct({
  product,
  menuSample,
  enabled = true,
}: {
  menuSample: string;
  product: productState;
  enabled?: boolean;
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
      <div className="menu-table-items flex overflow-x-hidden">
        {enabled && product?.variants?.length ? (
          <VariantAccordion product={product} menuSample={menuSample} />
        ) : (
          <p
            className={twMerge(
              cls,
              "overflow-x-scroll whitespace-nowrap border-l text-start",
            )}
          >
            {product.name}
          </p>
        )}
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
          disabled={!enabled}
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
          className={twMerge(
            cls,
            "flex h-full justify-center text-center focus-within:z-10",
          )}
        />
        <p className={twMerge(cls, "flex items-center justify-center")}>
          {Math.round(100 * product.totalPrice) / 100}
        </p>
      </div>
    </li>
  );
}
