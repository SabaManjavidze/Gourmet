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
import { MenuVariants } from "@/lib/types";

export interface currMenuType {
  name: string;
  id: string;
}
type CateringContextProps = {
  formData: cateringFormType | undefined;
  setFormData: Dispatch<SetStateAction<cateringFormType | undefined>>;
  currMenu: currMenuType | undefined;
  setCurrMenu: Dispatch<SetStateAction<currMenuType | undefined>>;
};
export interface cateringFormType {
  menuType: MenuVariants;
  personRange: number;
}
export const CateringContext = createContext<CateringContextProps>({
  formData: undefined,
  setFormData: () => null,
  currMenu: undefined,
  setCurrMenu: () => null,
});
export const useCatering = () => useContext(CateringContext);

export const CateringProvider = ({ children }: { children: ReactNode }) => {
  const [currMenu, setCurrMenu] = useState<undefined | currMenuType>();
  const [formData, setFormData] = useState<cateringFormType | undefined>();
  return (
    <CateringContext.Provider
      value={{
        formData,
        setFormData,
        currMenu,
        setCurrMenu,
      }}
    >
      {children}
    </CateringContext.Provider>
  );
};
