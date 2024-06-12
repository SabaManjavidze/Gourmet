import { type ClassValue, clsx } from "clsx";
import { Menu, MenuProduct, MenuState, menuKeys, productsState } from "menu";
import { v4 as uuid } from "uuid";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const Capitalize = (s: string) => {
  return `${s[0]?.toUpperCase()}${s.slice(1, s.length)}`;
};
export const limitTxt = (str: string, limit: number) => {
  return str.length > limit ? `${str.slice(0, limit)}...` : str;
};
export const MenuToState = (menu: Menu) => {
  const state: MenuState = {};
  menuKeys.forEach((key) => {
    state[key] = menu[key]?.map(({ name, price }, idx) => {
      return { id: uuid(), name, price, totalPrice: 0, quantity: 0 };
    });
  });
  return state;
};

export const PROFILE_ROUTE = "/user/profile";
