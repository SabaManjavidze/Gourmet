import { type ClassValue, clsx } from "clsx";
import { Menu, MenuProduct, MenuState, menuKeys, productsState } from "menu";
import { nanoid } from "nanoid";
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
      return { id: nanoid(), name, price, totalPrice: 0, quantity: 0 };
    });
  });
  return state;
};
