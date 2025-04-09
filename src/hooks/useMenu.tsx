"use client";
import { MenuToState } from "@/lib/utils";
import { ProductWithVariants, MenuState, productState } from "menu";
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
import { api, RouterOutputs } from "@/trpc/react";
import { useSession } from "next-auth/react";
import { UserSearchModal } from "@/app/admin/_components/user-search-modal";
import {
  MenuNameFormType,
  MenuNameModal,
} from "@/app/_components/menu-name-modal";
import { MIN_PERSON_CATER } from "@/lib/constants";
import { toast } from "sonner";
import { OrderNowModal } from "@/components/order-now-modal/order-now-modal";
import { TermsAndConditions } from "@/components/terms-and-conditions";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { linkedInTrack } from "nextjs-linkedin-insight-tag";
import { env } from "@/env";
import { sendGTMEvent } from "@next/third-parties/google";

type MenuContextProps = {
  dbMenu: Record<string, (ProductWithVariants & { quantity?: number })[]>;
  menu: MenuState;
  setMenu: Dispatch<SetStateAction<MenuState>>;
  totalSum: number;
  hideZeroQt: boolean;
  personCount: number;
  setPersonCount: Dispatch<SetStateAction<number>>;
  orderOpen: boolean;
  setOrderOpen: Dispatch<SetStateAction<boolean>>;
  changes: boolean;
  setHideZeroQt: Dispatch<SetStateAction<boolean>>;
  clearQuantities: () => void;
  handleSaveClick: ({}: {
    orderId?: string;
    menuName?: string;
    phoneNumber?: string;
  }) => Promise<boolean>;
  handleRemoveProduct: (productId: string) => void;
  handleOrderClick: () => boolean;
  saveLoading: boolean;
  addProduct: (menuSample: string, product: ProductWithVariants[]) => void;
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
  dbMenu: {},
  menu: {},
  totalSum: 0,
  personCount: 0,
  setMenu: () => null,
  setOrderOpen: () => null,
  orderOpen: false,
  setPersonCount: () => null,
  saveLoading: false,
  hideZeroQt: false,
  changes: false,
  setHideZeroQt: () => false,
  clearQuantities: () => null,
  changeQuantity: () => null,
  handleOrderClick: () => false,
  handleRemoveProduct: () => null,
  handleSaveClick: async ({}) => false,
  changeVariant: () => null,
  addProduct: () => null,
});
export const useMenu = () => useContext(MenuContext);

export const MenuProvider = ({
  dbMenu,
  userId,
  personRanges,
  setChanges,
  children,
  changes,
  addable = true,
}: {
  dbMenu: Record<string, (ProductWithVariants & { quantity?: number })[]>;
  userId?: string;
  addable?: boolean;
  personRanges?: { def: number; next: number };
  setChanges?: Dispatch<SetStateAction<boolean>>;
  changes?: boolean;
  children: ReactNode;
}) => {
  const [saveLoading, setSaveLoading] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const terms = useMemo(() => {
    const t = localStorage.getItem("tnc");
    if (t) {
      return t == "true";
    }
    return false;
  }, [termsOpen]);
  const [orderOpen, setOrderOpen] = useState(false);
  const [adminUserId, setAdminUserId] = useState<string | undefined>(userId);
  const [personCount, setPersonCount] = useState(
    personRanges?.def ?? MIN_PERSON_CATER,
  );
  const [open, setOpen] = useState(false);
  const [menuNameOpen, setMenuNameOpen] = useState(false);
  const [menuNameForm, setMenuNameForm] = useState<MenuNameFormType>({
    menuName: "",
    phone: undefined,
  });
  const [menu, setMenu] = useState<MenuState>({});
  const [removeProduct, setRemoveProduct] = useState<string[]>([]);
  const { data: session, status } = useSession();
  const utils = api.useUtils();
  const [hideZeroQt, setHideZeroQt] = useState(false);

  useEffect(() => {
    const state = MenuToState(dbMenu, personRanges?.def);
    setMenu(state);
  }, []);
  const totalSum = useMemo(() => {
    if (!menu) return 0;
    const s = Object.keys(menu).reduce((prev, curr) => {
      if (!menu?.[curr]) return prev;
      return (
        prev +
          Number(
            menu[curr]?.reduce((prev1, curr1) => {
              let item_price = curr1.price;
              if (curr1.active !== curr1.id) {
                const active_item = curr1.variants?.find(
                  (item) => item.id == curr1.active,
                );
                if (!active_item) throw new Error("active variant not found");
                item_price = active_item.price;
              }
              return (
                prev1 + Math.round(100 * item_price * curr1.quantity) / 100
              );
            }, 0),
          ) || 0
      );
    }, 0);
    return s;
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
          totalPrice: Math.round(100 * quantity * Number(product?.price)) / 100,
        };
      }
      return product;
    });
    if (!newMenuSample) throw new Error("Product not found");
    setMenu((prev) => ({ ...prev, [menuSample]: newMenuSample }));
    setChanges?.(true);
  };
  const handleRemoveProduct = (productId: string) => {
    if (removeProduct.includes(productId)) return null;
    setRemoveProduct((prev) => [...prev, productId]);
    setMenu((prev) => {
      const newMenu: typeof menu = {};
      let keyt = "";
      Object.keys(prev).forEach((key) => {
        const m = prev[key];
        if (m === undefined) return null;
        newMenu[key] = m.filter((prod) => {
          if (prod.id == productId) {
            keyt = key;
            return false;
          }
          return true;
        });
      });
      return Object.assign(prev, { [keyt]: newMenu[keyt] });
    });
    setChanges?.(true);
  };
  const handleSaveClick = async (params: {
    orderId?: string;
    menuName?: string;
    phoneNumber?: string;
  }) => {
    console.log({ params });
    // if orderId is passed it means we are updating an existing order
    // else we are creating a new order
    if (!params?.menuName) {
      setMenuNameOpen(true);
      return false;
    }
    if (!params.menuName) return false;
    const { menuName, orderId } = params;
    if (status !== "authenticated") {
      toast.error("Please log in");
      return false;
    }
    const menuKeys = Object.keys(menu);
    const mn = menuKeys[0];
    if (!mn) return false;
    setSaveLoading(true);
    const prods = [];
    if (menuKeys.length == 1) {
      for (const prod of menu[mn] ?? []) {
        if (removeProduct.includes(prod.id) || prod.quantity == 0) continue;
        prods.push({
          id: prod.active ?? prod.id,
          name: prod.name,
          price: prod.price,
          quantity: prod.quantity,
          variant_name: prod.variant_name,
        });
      }
    } else if (menuKeys.length > 1) {
      for (const key of menuKeys) {
        for (const prod of menu[key] ?? []) {
          if (removeProduct.includes(prod.id) || prod.quantity == 0) continue;
          prods.push({
            id: prod.active ?? prod.id,
            name: prod.name,
            price: prod.price,
            quantity: prod.quantity,
            variant_name: prod.variant_name,
          });
        }
      }
    }
    if (prods.length == 0) {
      toast.error("პროდუქტებს უნდა განუსაზღვროთ რაოდენობა.");
      setSaveLoading(false);
      return false;
    }
    if (session?.user?.role == "user") {
      if (orderId && removeProduct.length > 0) {
        await utils.client.order.removeProductFromOrder.mutate({
          orderId,
          productIds: removeProduct,
        });
      }
      await utils.client.order.createUserOrder.mutate({
        orderId,
        menuName: menuName,
        totalPrice: totalSum.toString(),
        phoneNumber: params.phoneNumber,
        status: "draft",
        products: prods,
        invoiceRequested: false,
      });
      await utils.order.getUserOrders.refetch();
      if (orderId) {
        await utils.order.getUserOrder.invalidate({ orderId });
      }
    } else if (session?.user?.role == "admin") {
      if (!orderId && !adminUserId && !menuName) {
        setOpen(true);
        setSaveLoading(false);
        toast.error("Something went wrong.");
        return false;
      }
      if (!adminUserId) {
        setSaveLoading(false);
        toast.error("Something went wrong.");
        return false;
      }

      if (orderId && removeProduct.length > 0) {
        await utils.client.admin.removeProductFromUserOrder.mutate({
          orderId,
          userId: adminUserId,
          productIds: removeProduct,
        });
      }
      await utils.client.admin.createUserOrder.mutate({
        userId: adminUserId,
        orderId,
        menuName: menuName,
        totalPrice: totalSum.toString(),
        status: "draft",
        products: prods,
        adminInvoice: false,
        userInvoice: false,
      });
      await utils.admin.getUserOrders.invalidate();
      if (orderId) {
        await utils.admin.getUserOrder.invalidate({ userId, orderId });
      }
    }
    setChanges?.(false);
    setSaveLoading(false);
    setMenuNameForm((prev) => {
      return { ...prev, menuName: "" };
    });
    toast.success(
      orderId ? "თქვენი მენიუ განახლდა." : "თქვენი მენიუ შენახულია.",
    );
    return true;
  };
  const handleOrderClick = () => {
    if (!terms) {
      setTermsOpen(true);
      return false;
    }
    // if (status !== "authenticated") return false;
    // if (!menuName) {
    //   setMenuNameOpen(true);
    //   return false;
    // }
    return true;
    // console.log("order clicked");
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
    setChanges?.(true);
  };
  const addProduct = (menuName: string, products: ProductWithVariants[]) => {
    const prods = menu[menuName];
    if (!prods) return null;
    const addedProds = [];
    for (const product of products) {
      const found = prods.find(
        (prod) => prod.id == product.id,
        // prod.id == product.id ||
        // product?.variants?.find((varp) => varp.id == prod.id),
      );
      if (found) continue;
      addedProds.push({
        ...product,
        active: product.id,
        quantity: 1,
        totalPrice: product.price,
      });
    }
    const newMenu = prods.concat(addedProds);
    setMenu((prev) => ({
      ...prev,
      [menuName]: newMenu,
    }));
    setChanges?.(true);
  };
  return (
    <MenuContext.Provider
      value={{
        personCount,
        saveLoading,
        setPersonCount,
        orderOpen,
        setOrderOpen,
        setMenu,
        menu,
        dbMenu,
        totalSum,
        changes: !!changes,
        changeQuantity,
        handleRemoveProduct,
        handleOrderClick,
        handleSaveClick,
        changeVariant,
        clearQuantities,
        addProduct,
        hideZeroQt,
        setHideZeroQt,
      }}
    >
      {addable && orderOpen && terms ? (
        <OrderNowModal
          open={orderOpen}
          closeModal={() => setOrderOpen(false)}
        />
      ) : null}
      {!terms ? (
        <TermsAndConditions
          open={termsOpen}
          closeModal={() => {
            setTermsOpen(false);
            setOrderOpen(true);
          }}
        />
      ) : null}
      {menuNameOpen ? (
        <MenuNameModal
          open={menuNameOpen}
          closeModal={async () => {
            setMenuNameOpen(false);
          }}
          onSubmit={(data: MenuNameFormType) => {
            setMenuNameForm(data);
            handleSaveClick({
              menuName: data.menuName,
              phoneNumber: data.phone,
            });
            linkedInTrack(env.LINKEDIN_EVENT_ID);

            sendGTMEvent({
              event: "buttonClicked",
              value: "order made",
            });
            setMenuNameOpen(false);
          }}
        />
      ) : null}
      {session?.user?.role == "admin" && open ? (
        <UserSearchModal
          open={open}
          userId={adminUserId}
          setUserId={setAdminUserId}
          closeModal={() => setOpen(false)}
        />
      ) : null}
      {children}
    </MenuContext.Provider>
  );
};
