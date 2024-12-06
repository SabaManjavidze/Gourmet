"use client";

import { Input } from "@/components/ui/input";
import { useCatering } from "@/hooks/useCatering";
import { useMenu } from "@/hooks/useMenu";
import { MIN_PERSON_CATER } from "@/lib/constants";
import { api } from "@/trpc/react";
import { XCircleIcon } from "lucide-react";
import { productState } from "menu";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export function NumberOfGuests({
  personRanges,
}: {
  personRanges?: { next: number; def: number };
}) {
  const { personCount, setPersonCount, menu, dbMenu, setMenu } = useMenu();
  const { currMenu, formData, setFormData } = useCatering();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );
  // const utils = api.useUtils();
  const changePersonCount = async (count: number, menuSample?: string) => {
    if (count < MIN_PERSON_CATER) {
      setPersonCount(count);
      return;
    }
    if (!currMenu || !formData || !personRanges) return;
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
    router.replace(
      pathname + "?" + createQueryString("personRange", count.toString()),
      { scroll: false },
    );
    const newMenu: productState[] = [];
    for (const prod of m) {
      if (prod?.qgrowth_factor == undefined) {
        console.log(prod.qgrowth_factor);
        newMenu.push(prod);
        continue;
      }
      const def_quantity = dbMenu[menuName]?.find(
        (item) => item.id == prod.id,
      )?.quantity;
      if (!def_quantity) throw new Error("no def product");
      const def = Math.floor(personRanges?.def / 10) * 10;
      const prev_c_diff = personCount - Number(def);
      const prev_q =
        def_quantity + Math.round(prev_c_diff * Number(prod.qgrowth_factor));
      const c_diff = count - Number(def);
      let new_q =
        def_quantity + Math.round(c_diff * Number(prod.qgrowth_factor));
      if (prod.quantity !== prev_q) {
        new_q =
          def_quantity +
          prod.quantity -
          prev_q +
          Math.round(c_diff * Number(prod.qgrowth_factor));
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
    // console.log({ count, next: personRanges.next });
    const count_def = Math.floor(count / 10) * 10;
    const count_next = Math.ceil(count / 10) * 10;
    // console.log({ count, count_def, def: personRanges.def });
    if (count >= personRanges.next) {
      setFormData({ ...formData, personRange: personRanges.next.toString() });
    } else if (
      personRanges.def > count_def &&
      personRanges.next !== count_next
    ) {
      // console.log("hello");
      setFormData({ ...formData, personRange: count.toString() });
    }
  };

  return (
    <div className="flex w-full items-center justify-center">
      <h3
        className="w-4/5 text-xl font-semibold text-gray-500 
              max-xl:text-lg max-md:text-base max-sm:text-xs"
      >
        გთხოვთ, შეიყვანოთ სტუმრების რაოდენობა და მიიღეთ იდეალური მენიუ თქვენთვის
      </h3>
      <Input
        type="number"
        value={personCount.toString()}
        min={0}
        onChange={(e) => {
          let val = e.currentTarget.value;
          if (val == "" && personCount !== 0) {
            val = "0";
          }
          const q = parseInt(val);
          if (isNaN(q)) return;
          changePersonCount(q || 0);
        }}
        className="ml-4 w-16 rounded-xl text-center text-lg text-muted-sm
                max-lg:h-8 max-lg:text-base max-md:w-12 max-md:px-1 max-sm:text-xs"
      />
    </div>
  );
}
