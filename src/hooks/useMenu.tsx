"use client";
import { MenuToState } from "@/lib/utils";
import {
  Menu,
  MenuProduct,
  MenuState,
  menuKey,
  menuKeys,
  productsState,
} from "menu";
import { nanoid } from "nanoid";
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

type MenuContextProps = {
  menu: MenuState;
  totalSum: number;
  hideZeroQt: boolean;
  setHideZeroQt: Dispatch<SetStateAction<boolean>>;
  clearQuantities: () => void;
  addProduct: (menuSample: menuKey, product: MenuProduct[]) => void;
  changeQuantity: (
    menuSample: menuKey,
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
  addProduct: () => null,
});
export const useMenu = () => useContext(MenuContext);

export const MenuProvider = ({
  dbMenu,
  children,
}: {
  dbMenu: Menu;
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
    return (Object.keys(menu) as menuKey[]).reduce((prev, curr) => {
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
  const changeQuantity = (
    menuSample: menuKey,
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
    setMenu((prev) => ({ ...prev, [menuSample]: newMenuSample }));
  };
  const clearQuantities = () => {
    const newMenu: MenuState = {};
    (Object.keys(menu) as menuKey[]).forEach((key) => {
      newMenu[key] = menu[key]?.map((prod) => {
        return { ...prod, quantity: 0, totalPrice: 0 };
      });
    });
    setMenu(newMenu);
  };
  const addProduct = (menuName: menuKey, products: MenuProduct[]) => {
    if (!menu?.[menuName]) return null;
    const newMenu = [
      ...(menu[menuName] as any),
      ...products.map(({ name, price }) => {
        return { id: nanoid(), name, price, quantity: 1, totalPrice: price };
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
