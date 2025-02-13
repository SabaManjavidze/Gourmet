"use client";

import { CustomCatering } from "@/app/_components/custom-catering";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { useCatering } from "@/hooks/useCatering";
import { useMenu } from "@/hooks/useMenu";
import { MAX_PERSON_CATER, MIN_PERSON_CATER } from "@/lib/constants";
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
  const { currMenu, formData, setFormData, setCustomOpen } = useCatering();
  const searchParams = useSearchParams();
  const [over50, setOver50] = useState(false);
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
      console.log("less");
      setPersonCount(count);
      return;
    } else if (count >= MAX_PERSON_CATER) {
      setPersonCount(MAX_PERSON_CATER - 1);
      router.replace(
        pathname +
          "?" +
          createQueryString("personRange", `${MAX_PERSON_CATER - 1}`),
        { scroll: false },
      );
      setOver50(true);
      return;
    }
    if (!currMenu || !formData || !personRanges) return;
    let menuStateProducts;
    let menuName = "";
    if (!menuSample) {
      menuName = Object.keys(dbMenu)[0] as string;
      menuStateProducts = menu?.[menuName];
    } else {
      menuStateProducts = menu?.[menuSample];
      menuName = menuSample;
    }
    if (!menuStateProducts || !menuName) return;
    setPersonCount(count);
    router.replace(
      pathname + "?" + createQueryString("personRange", count.toString()),
      { scroll: false },
    );
    const newMenu: productState[] = [];
    for (const stateProduct of menuStateProducts) {
      if (stateProduct?.qgrowth_factor == undefined) {
        console.log({ growth_undefined: stateProduct.qgrowth_factor });
        newMenu.push(stateProduct);
        continue;
      }
      // quantity of product that was in db menu
      const db_prod_quantity = dbMenu[menuName]?.find(
        (item) => item.id == stateProduct.id,
      )?.quantity;
      if (!db_prod_quantity) throw new Error("no def product");
      // using personRanges.def instead of count to keep track of the particular 10th
      // state of the menu was in before function.

      // form person range rounded to nearest 10th
      const nearest_range = Math.floor(personRanges?.def / 10) * 10;

      // personCount (value of input element) - def (ex: 22-20; 14-10; 39-30)
      // const person_count_diff = personCount - nearest_range;

      // quantity calculated by personCount multiplier (qgrowth_factor)
      // const prev_q =
      //   db_prod_quantity +
      //   Math.round(person_count_diff * Number(stateProduct.qgrowth_factor));

      // new person count - def
      const c_diff = count - nearest_range;

      const new_q =
        db_prod_quantity +
        Math.round(c_diff * Number(stateProduct.qgrowth_factor));

      // console.log({ new_q, prev_q, quantity: stateProduct.quantity });
      // if (stateProduct.quantity !== prev_q) {
      //   new_q =
      //     db_prod_quantity +
      //     stateProduct.quantity -
      //     prev_q +
      //     Math.round(c_diff * Number(stateProduct.qgrowth_factor));
      // }
      newMenu.push({
        ...stateProduct,
        quantity: new_q,
        totalPrice: stateProduct.price * new_q,
      });
    }
    setMenu({
      [menuName]: newMenu,
    });
    // const count_def = Math.floor(count / 10) * 10;
    // const count_next = Math.ceil(count / 10) * 10;
    // if (count >= personRanges.next) {
    //   setFormData({ ...formData, personRange: personRanges.next.toString() });
    // } else if (
    //   personRanges.def > count_def &&
    //   personRanges.next !== count_next
    // ) {
    setFormData({ ...formData, personRange: count.toString() });
    // }
  };

  return (
    <div className="flex w-full items-center justify-center">
      <Modal
        isOpen={over50}
        closeModal={() => setOver50(false)}
        title="50+ კაციანი ფურშეტისთვის დაგვეკონტაქტეთ"
        className="w-3/5"
      >
        <CustomCatering
          onClick={() => {
            setOver50(false);
            setCustomOpen(true);
          }}
        />
      </Modal>
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
