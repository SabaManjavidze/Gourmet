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
        <DeleteIcon className="z-20 ml-1" size={20} />
      </Button>
      <div className="w-1/2 flex-col overflow-x-hidden max-sm:w-2/5 max-xs:w-1/4 xl:w-3/4">
        <p
          className={twMerge(
            cls,
            `${product.variants?.length ? "border-b-0 pb-2" : ""} overflow-hidden whitespace-nowrap border-l text-start`,
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
                className={`h-8 rounded-xl text-xs text-foreground ${product.active == product.id ? "bg-accent/30" : ""}`}
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
                  className={`${product.active == variant.id ? "bg-accent/30" : ""} h-8 rounded-xl text-xs text-foreground`}
                >
                  {variant.name}
                </Button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <div
        className="xl:1/4 flex w-1/2 justify-between whitespace-nowrap 
        *:h-full *:w-full max-sm:w-3/5 max-sm:whitespace-pre-line max-xs:w-3/4"
      >
        <p className={twMerge(cls, "flex items-center justify-center")}>
          {product.price}
        </p>
        <Input
          type="number"
          min={0}
          onChange={(e) => {
            changeQuantity(
              menuSample,
              product.id,
              Number(e.currentTarget.value),
            );
          }}
          value={product.quantity}
          className={twMerge(
            cls,
            "h-full text-center text-lg font-medium focus-within:z-10 max-lg:text-base max-md:text-sm",
          )}
        />
        <p className={twMerge(cls, "flex items-center justify-center")}>
          {product.totalPrice}
        </p>
      </div>
    </li>
  );
}
