import { Input } from "@/components/ui/input";
import { TableRow, TableCell } from "@/components/ui/table";
import { useMenu } from "@/hooks/useMenu";
import type { MenuProduct, menuKey, productState } from "menu";
import { v4 as uuid } from "uuid";
import { twMerge } from "tailwind-merge";

const cls = "border border-t-0 border-l-0 w-full p-5";
export function MenuProduct({
  product,
  menuSample,
}: {
  menuSample: menuKey;
  product: productState;
}) {
  const { changeQuantity, hideZeroQt } = useMenu();
  return (
    <li
      // hidden={product.quantity == 0}
      className={`text-muted-sm ${hideZeroQt && product.quantity == 0 ? "hidden" : "flex"} 
      w-full justify-between text-center text-lg font-medium 
      max-lg:text-base max-md:text-sm`}
    >
      <div className="w-1/2 max-sm:w-2/5 max-xs:w-1/4">
        <p
          className={twMerge(
            cls,
            "h-full overflow-hidden whitespace-nowrap border-l text-start",
          )}
        >
          {product.name}
        </p>
      </div>
      <div className="flex w-1/2 justify-between max-sm:w-3/5 max-xs:w-3/4">
        <p className={cls}>{product.price}</p>
        <Input
          type="number"
          min={0}
          onChange={(e) =>
            changeQuantity(
              menuSample,
              product.id,
              Number(e.currentTarget.value),
            )
          }
          value={product.quantity}
          className={twMerge(
            cls,
            "h-full text-center text-lg font-medium focus-within:z-10 max-lg:text-base max-md:text-sm",
          )}
        />
        <p className={cls}>{product.totalPrice}</p>
      </div>
    </li>
  );
}
