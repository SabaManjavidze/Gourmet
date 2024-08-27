"use client";

import { Input } from "@/components/ui/input";
import { useCatering } from "@/hooks/useCatering";
import { useMenu } from "@/hooks/useMenu";
import { api } from "@/trpc/react";
import { XCircleIcon } from "lucide-react";
import { productState } from "menu";

export function NumberOfGuests({
  personRanges,
}: {
  personRanges: { next: number; def: number };
}) {
  const { personCount, setPersonCount, menu, dbMenu, setMenu } = useMenu();
  const { currMenu, formData, setFormData } = useCatering();
  const utils = api.useUtils();
  const changePersonCount = async (count: number, menuSample?: string) => {
    if (!currMenu || !formData) return;
    let m;
    let menuName = "";
    if (!menuSample) {
      menuName = Object.keys(dbMenu)[0] as string;
      m = menu?.[menuName];
    } else {
      m = menu?.[menuSample];
      menuName = menuSample;
    }
    if (!m || !menuName) return;
    setPersonCount(count);
    const newMenu: productState[] = [];
    for (const prod of m) {
      const def_quantity = dbMenu[menuName]?.find(
        (item) => item.id == prod.id,
      )?.quantity;
      if (!def_quantity) throw new Error("no def product");
      const prev_c_diff = personCount - Number(personRanges?.def);
      const prev_q =
        def_quantity + Math.round(prev_c_diff * Number(prod.qgroth_factor));
      const c_diff = count - Number(personRanges?.def);
      let new_q =
        def_quantity + Math.round(c_diff * Number(prod.qgroth_factor));
      if (prod.quantity !== prev_q) {
        new_q =
          def_quantity +
          prod.quantity -
          prev_q +
          Math.round(c_diff * Number(prod.qgroth_factor));
      }
      newMenu.push({
        ...prod,
        quantity: new_q,
        totalPrice: prod.price * new_q,
      });
    }
    setMenu({
      [menuName]: newMenu,
    });
    if (count >= personRanges.next) {
      setFormData({ ...formData, personRange: personRanges.next });
    }
  };
  return (
    <div className="flex w-full items-center justify-center">
      <h3
        className="w-4/5 text-xl font-semibold text-gray-500 
              max-xl:text-lg max-md:text-base max-sm:text-xs"
      >
        Please Enter Number of Guests and Get Perfect Menu For You
      </h3>
      <Input
        type="number"
        min={10}
        value={personCount}
        onChange={(e) => {
          changePersonCount(Number(e.currentTarget.value));
        }}
        className="ml-4 w-16 rounded-xl text-center text-lg text-muted-sm
                max-lg:h-8 max-lg:text-base max-md:w-12 max-md:px-1 max-sm:text-xs"
      />
    </div>
  );
}
