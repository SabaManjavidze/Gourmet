import { type ClassValue, clsx } from "clsx";
import { MenuState, ProductWithVariants } from "menu";
import { v4 as uuid } from "uuid";
import { twMerge } from "tailwind-merge";
import { RouterOutputs } from "@/trpc/react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const Capitalize = (s: string) => {
  return `${s[0]?.toUpperCase()}${s.slice(1, s.length)}`;
};

export function keysFromObject<T extends object>(object: T): (keyof T)[] {
  return Object.keys(object) as (keyof T)[];
}

export const limitTxt = (str: string, limit: number) => {
  const news =
    str.length > limit
      ? `${str.slice(0, str[limit - 1] == " " ? limit - 1 : limit)}...`
      : str;
  return news;
};
export const MenuToState = (
  menu: Record<
    string,
    (ProductWithVariants & { quantity?: number | string })[]
  >,
  person_range?: number,
) => {
  const state: MenuState = {};
  Object.keys(menu).forEach((key) => {
    if (!menu[key]) throw new Error("Menu not found");
    state[key] =
      menu[key]?.map((prod, idx) => {
        let next_q;
        const quantity = Number(prod.quantity) ?? 0;
        if (person_range) {
          const c_diff = person_range % 10;
          next_q = quantity + Math.round(c_diff * Number(prod.qgrowth_factor));
        }
        return {
          ...prod,
          active: prod.id,
          price: Number(prod.price),
          totalPrice: prod.price * quantity,
          quantity: person_range !== undefined && next_q ? next_q : quantity,
        };
      }) ?? [];
  });
  return state;
};

export const PROFILE_ROUTE = "/user/profile";
