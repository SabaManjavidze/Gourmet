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
  useState,
} from "react";

type MenuContextProps = {
  menu: MenuState;
  hideZeroQt: boolean;
  setHideZeroQt: Dispatch<SetStateAction<boolean>>;
  handleAddProduct: (menuSample: menuKey, product: MenuProduct[]) => void;
  handleChangeQuantity: (
    menuSample: menuKey,
    productId: string,
    quantity: number,
  ) => void;
};
export const MenuContext = createContext<MenuContextProps>({
  menu: {},
  hideZeroQt: false,
  setHideZeroQt: () => false,
  handleChangeQuantity: () => null,
  handleAddProduct: () => null,
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
  const handleChangeQuantity = (
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
  const handleAddProduct = (menuName: menuKey, products: MenuProduct[]) => {
    if (!menu?.[menuName]) return null;
    const newMenu = [
      ...(menu[menuName] as any),
      ...products.map(({ name, price }) => {
        return { id: nanoid(), name, price, quantity: 1, totalPrice: price };
      }),
    ];
    console.log(newMenu);
    setMenu((prev) => ({
      ...prev,
      [menuName]: newMenu,
    }));
  };
  return (
    <MenuContext.Provider
      value={{
        menu,
        handleChangeQuantity,
        handleAddProduct,
        hideZeroQt,
        setHideZeroQt,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
