"use client";
import { MenuToState } from "@/lib/utils";
import { MenuProduct, MenuState } from "menu";
import { v4 as uuid } from "uuid";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { RouterOutputs } from "@/trpc/react";

type MenuContextProps = {
  menu: MenuState;
  totalSum: number;
  hideZeroQt: boolean;
  setHideZeroQt: Dispatch<SetStateAction<boolean>>;
  clearQuantities: () => void;
  addProduct: (menuSample: string, product: MenuProduct[]) => void;
  changeVariant: (
    menuSample: string,
    productId: string,
    variantId: string,
  ) => void;
  changeQuantity: (
    menuSample: string,
    productId: string,
    quantity: number,
  ) => void;
};
export const MenuContext = createContext<MenuContextProps>({
  menu: {},
  totalSum: 0,
  hideZeroQt: false,
  setHideZeroQt: () => false,
  clearQuantities: () => null,
  changeQuantity: () => null,
  changeVariant: () => null,
  addProduct: () => null,
});
export const useMenu = () => useContext(MenuContext);

export const MenuProvider = ({
  dbMenu,
  children,
}: {
  dbMenu: RouterOutputs["sampleMenu"]["getMainMenu"];
  children: ReactNode;
}) => {
  const [menu, setMenu] = useState<MenuState>({});
  const [hideZeroQt, setHideZeroQt] = useState(false);

  useEffect(() => {
    const state = MenuToState(dbMenu);
    setMenu(state);
  }, [dbMenu]);
  const totalSum = useMemo(() => {
    if (!menu) return 0;
    return Object.keys(menu).reduce((prev, curr) => {
      if (!menu?.[curr]) return prev;
      return (
        prev +
          Number(
            menu[curr]?.reduce((prev1, curr1) => {
              return prev1 + curr1.price * curr1.quantity;
            }, 0),
          ) || 0
      );
    }, 0);
  }, [menu]);
  const changeVariant = (
    menuSample: string,
    productId: string,
    variantId: string,
  ) => {
    const newMenuSample = menu[menuSample]?.map((product) => {
      if (product.id == productId) {
        return {
          ...product,
          active: variantId,
        };
      }
      return product;
    });
    if (!newMenuSample) throw new Error("Product not found");
    setMenu((prev) => ({ ...prev, [menuSample]: newMenuSample }));
  };
  const changeQuantity = (
    menuSample: string,
    productId: string,
    quantity: number,
  ) => {
    const newMenuSample = menu[menuSample]?.map((product) => {
      if (product.id == productId) {
        return {
          ...product,
          quantity,
          totalPrice: quantity * Number(product?.price),
        };
      }
      return product;
    });
    if (!newMenuSample) throw new Error("Product not found");
    setMenu((prev) => ({ ...prev, [menuSample]: newMenuSample }));
  };
  const clearQuantities = () => {
    const newMenu: MenuState = {};
    Object.keys(menu).forEach((key) => {
      if (!menu[key]) return null;
      newMenu[key] =
        menu[key]?.map((prod) => {
          return { ...prod, quantity: 0, totalPrice: 0 };
        }) ?? [];
    });
    setMenu(newMenu);
  };
  const addProduct = (menuName: string, products: MenuProduct[]) => {
    if (!menu?.[menuName]) return null;
    const newMenu = [
      ...(menu[menuName] as any),
      ...products.map(({ name, price }) => {
        return { id: uuid(), name, price, quantity: 1, totalPrice: price };
      }),
    ];
    setMenu((prev) => ({
      ...prev,
      [menuName]: newMenu,
    }));
  };
  return (
    <MenuContext.Provider
      value={{
        menu,
        totalSum,
        changeQuantity,
        changeVariant,
        clearQuantities,
        addProduct,
        hideZeroQt,
        setHideZeroQt,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
