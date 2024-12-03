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
import { useSearchParams } from "next/navigation";
import { cateringFormType } from "@/app/catering/_components/catering-form-modal";

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
// export interface cateringFormType {
//   menuType: MenuVariants;
//   personRange: number;
// }
export const CateringContext = createContext<CateringContextProps>({
  formData: undefined,
  setFormData: () => null,
  currMenu: undefined,
  setCurrMenu: () => null,
});
export const useCatering = () => useContext(CateringContext);

export const CateringProvider = ({ children }: { children: ReactNode }) => {
  const searchParams = useSearchParams();
  const menuIdArg = searchParams.get("menuId");
  const menuNameArg = searchParams.get("menuName");
  const menuTypeArg = searchParams.get("type");
  const dataArg = searchParams.get("data");
  let additional_data:
    | undefined
    | Omit<cateringFormType, "type" | "personRange">;
  if (
    menuTypeArg !== null &&
    menuTypeArg != "cheap" &&
    menuTypeArg != "standard" &&
    menuTypeArg != "expensive"
  )
    throw new Error("invalid url");
  if (dataArg) {
    console.log({ dataArg });
    additional_data = JSON.parse(dataArg);
  } else {
    additional_data = undefined;
  }
  const personRangeArg = searchParams.get("personRange");
  const [currMenu, setCurrMenu] = useState<undefined | currMenuType>(
    menuIdArg && menuNameArg ? { id: menuIdArg, name: menuNameArg } : undefined,
  );
  const [formData, setFormData] = useState<cateringFormType | undefined>(
    menuTypeArg && personRangeArg
      ? {
          type: menuTypeArg,
          personRange: personRangeArg,
          assistance: additional_data?.assistance ?? "არა",
          drinks: additional_data?.drinks ?? [],
          plates: additional_data?.plates ?? "ერთჯერადი",
        }
      : undefined,
  );
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
