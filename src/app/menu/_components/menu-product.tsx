import { Input } from "@/components/ui/input";
import { TableRow, TableCell } from "@/components/ui/table";
import { useMenu } from "@/hooks/useMenu";
import type { MenuProduct, menuKey, productState } from "menu";
import { nanoid } from "nanoid";
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
      className={`text-muted-sm ${hideZeroQt && product.quantity == 0 ? "hidden" : "flex"} w-full justify-between text-center text-lg font-medium`}
    >
      <div className="w-2/3">
        <p className={twMerge(cls, "text-start", "border-l")}>{product.name}</p>
      </div>
      <div className="flex w-1/3 justify-between">
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
            "h-full text-center text-lg font-medium focus-within:z-10",
          )}
        />
        <p className={cls}>{product.totalPrice}</p>
      </div>
    </li>
  );
}
