"use client";
import { MenuToState } from "@/lib/utils";
import { Menu, MenuProduct, MenuState, menuKey, productsState } from "menu";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type MenuContextProps = {
  menu: MenuState;
  handleChangeQuantity: (
    menuSample: menuKey,
    productId: string,
    quantity: number,
  ) => void;
};
export const MenuContext = createContext<MenuContextProps>({
  menu: {},
  handleChangeQuantity: () => null,
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

  useEffect(() => {
    const products = MenuToState(dbMenu);
    setMenu(products);
  }, []);
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
  return (
    <MenuContext.Provider
      value={{
        menu,
        handleChangeQuantity,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
