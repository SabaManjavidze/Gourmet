"use client";
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
import { api, RouterInputs, RouterOutputs } from "@/trpc/react";
import { User } from "next-auth";
import { useMenu } from "./useMenu";
import { useSession } from "next-auth/react";

type DiscountContextProps = {
  discountedPrice: number;
};
export const DiscountContext = createContext<DiscountContextProps>({
  discountedPrice: 0,
});

export const useDiscount = () => {
  const { totalSum } = useMenu();
  const session = useSession();
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [discountType, setDiscountType] = useState<
    "none" | "first order" | "third order"
  >("none");
  const { isLoading, data, error } = api.order.getUserOrderCount.useQuery(
    undefined,
    { enabled: session?.status == "authenticated" },
  );
  useEffect(() => {
    if (isLoading) return;
    const val = Number(data);
    if (session.status !== "authenticated" || val != 3 || error) {
      setDiscountedPrice(totalSum);
      setDiscountType("none");
      return;
    }
    if (val == 3) {
      setDiscountedPrice(totalSum * 0.9);
      setDiscountType("third order");
    }
  }, [isLoading]);

  return { isLoading, discountedPrice, discountType };
};
